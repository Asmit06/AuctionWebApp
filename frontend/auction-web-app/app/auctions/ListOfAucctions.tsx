"use client"
import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import PaginateApp from '../components/PaginateApp';
import { getData } from '../actions/AuctionActiona';

// async function getData(): Promise<PagedResult<Auction>> {
//     const res = await fetch('http://localhost:6001/search?pageSize=4');
//     if(!res.ok) throw new Error("Failed to setch data");
//     const data = await res.json();
//     return data;
// }

const Listings = () => {
  const [auctions , setAuctions] = useState<Auction[]>([]);
  const [pageCount , setPageCount] = useState(0);
  const [pageNumber , setPageNumber] = useState(1);

  useEffect(()=>{
    getData(pageNumber).then(data => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    })
  //const [pageNumber , setPageNumber] = useState(1);
  },[pageNumber]);

  if(auctions.length === 0) return <h3>Loading ...</h3>

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-100'>
        {auctions && auctions.map((auction)=>(
          <AuctionCard auction={auction} key={auction.id}/>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <PaginateApp currentPage={pageNumber} pageChanged={setPageNumber} pageCount={pageCount}/>
      </div>
    </>
  )
}

export default Listings