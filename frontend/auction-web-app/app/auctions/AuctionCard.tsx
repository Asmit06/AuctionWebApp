
import React from 'react'
import Timer from './Timer'
import ImageContainer from './ImageContainer'
import { Auction } from '@/types'

type Props = {
    auction: Auction
}

const AuctionCard = ({auction} : Props) => {
  return (
    <a href='#' className='group'>
            <div className='card w-78 bg-base-100 shadow-xl aspect-w-16 aspect-h-10 rounded-lg overflow-hidden'>
                <div>
                    <ImageContainer imageUrl={auction.imageUrl}/>
                    <div className='absolute bottom-2 left-2'>
                        <Timer auctionEnd={auction.auctionEnd} />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{auction.itemName}</h2>
                <p>{auction.itemDesc}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>

        </a>

    
  )
}

export default AuctionCard