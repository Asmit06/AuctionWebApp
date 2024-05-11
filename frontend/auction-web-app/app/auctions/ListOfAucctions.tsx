"use client"
import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import PaginateApp from '../components/PaginateApp';
import { getData } from '../actions/AuctionActiona';
import { useParamsStore } from '@/hooks/useZustandStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';
import Filters from './Filters';
import { useAuctionStore } from '@/hooks/useAuctionStore';
// async function getData(): Promise<PagedResult<Auction>> {
//     const res = await fetch('http://localhost:6001/search?pageSize=4');
//     if(!res.ok) throw new Error("Failed to setch data");
//     const data = await res.json();
//     return data;
// }

const Listings = () => {
  // const [auctions , setAuctions] = useState<Auction[]>([]);
  // const [pageCount , setPageCount] = useState(0);
  // const [pageNumber , setPageNumber] = useState(1);

  //const [data, setData] = useState<PagedResult<Auction>>();
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    searchTerm: state.searchTerm,
    Type: state.Type,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
  }), shallow);

  const data = useAuctionStore(state => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount
  }), shallow);
  const setData = useAuctionStore(state => state.setData);

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
}

  useEffect(()=>{
    getData(url).then(data => {
      // setAuctions(data.results);
      // setPageCount(data.pageCount);
      setData(data);
      setLoading(false);
      //console.log(url);
    })
  },[url, setData]);

  if(loading) return <h3>Loading ...</h3>

  return (
    <>
      <Filters />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-100'>
        {data.auctions.map((auction)=>(
          <AuctionCard auction={auction} key={auction.id}/>
        ))}
      </div>
      <span className='flex justify-center mt-4'>Total {data.totalCount} items found</span>
      <div className='flex justify-center mt-4'>
        
        <PaginateApp currentPage={params.pageNumber} pageChanged={setPageNumber} pageCount={data.pageCount}/>
      </div>
    </>
  )
}

export default Listings