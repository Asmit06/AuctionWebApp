import { getBidsForAuction, getDetailedViewData } from '@/app/actions/AuctionActiona'
import Heading from '@/app/components/Heading';
import React from 'react'
import Timer from '../../Timer';
import ImageContainer from '../../ImageContainer';
import TableDetails from './TableDetails';
import { getCurrentuser } from '@/app/actions/AuthActions';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import BidItem from './BidItem';
import BidList from './BidList';

const Details = async ({params} : {params: {id : string}}) => {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentuser();
  
  return (
    <div>
      <div className='flex justify-between'>
      <div className='flex items-center gap-3'>
        <Heading title={`${data.itemName}`} subtitle={`${data.itemDesc}`} />
        {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>

          )}
          </div>
        <div className='flex gap-3'>
            <h3 className='text-2xl font-semibold'>Time Remaining:</h3>
            <Timer auctionEnd={data.auctionEnd}/>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 mt-3'>
        <div className='w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden'>
          <ImageContainer imageUrl={data.imageUrl} />
        </div>

        <BidList user={user} auction={data}/>
      </div>

      <div className='mt-3 grid grid-cols-1 rounded-lg'>
        <TableDetails auction={data} />
      </div>

    </div>
  )
}

export default Details