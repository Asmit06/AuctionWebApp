'use client'

import { useAuctionStore } from '@/hooks/useAuctionStore'
import { useBidStore } from '@/hooks/useBidStore'
import { AuctionFinished, Bid } from '@/types'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { User } from 'next-auth'
import React, { ReactNode, useEffect, useState } from 'react'
import { getDetailedViewData } from '../actions/AuctionActiona'
import toast from 'react-hot-toast'
import AuctionFinishedToast from '../components/AuctionFinishedToast'

type Props = {
    children: ReactNode
    user: User | null
}

const SignalR = ({children, user}: Props) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const API_URL = process.env.NODE_ENV === 'production' ? 'http://api.auctions.com/notifications'
    : process.env.NEXT_PUBLIC_NOTIFY_URL;

    useEffect(()=>{
        const newConnection = new HubConnectionBuilder()
                .withUrl(API_URL!)
                .withAutomaticReconnect()
                .build();

        setConnection(newConnection);
    },  [API_URL]);

    useEffect(()=>{
        if(connection){
            connection.start()
                .then(()=>{
                    console.log('Connected to socket hub');
                    connection.on('BidPlaced', (bid: Bid)=>{
                        console.log('Bid placved event recieved');
                        if(bid.bidStatus.includes('Accepted')){
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        addBid(bid);
                    });

                    connection.on('AuctionFinishhed', (finishedAuction: AuctionFinished) => {
                        const auction = getDetailedViewData(finishedAuction.auctionId);
                        return toast.promise(auction , {
                            loading: 'Loading',
                            success: (auction) => 
                                <AuctionFinishedToast 
                                    finishedAuction={finishedAuction} 
                                    auction={auction}
                                />,
                            error: (err) => 'Auction finished!'
                        }, {success: {duration: 10000, icon: null}});
                    })
                }).catch(error => console.log(error));
        }

        return () => {
            connection?.stop();
        }

    }, [connection, setCurrentPrice]);
    return (
        children
    )
}

export default SignalR
