"use client"
import { useParamsStore } from '@/hooks/useZustandStore'
import React, { useState } from 'react'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs'
import { GiFinishLine, GiFlame } from 'react-icons/gi'

//const pageSizeButtons = [4, 8, 10];

const orderButtons = [
  {
      label: 'Alphabetical',
      icon: AiOutlineSortAscending,
      value: 'ItemName'
  },
  {
      label: 'End date',
      icon: AiOutlineClockCircle,
      value: 'DateEnd'
  },
  {
      label: 'Recently added',
      icon: BsFillStopCircleFill,
      value: 'Latest'
  },
]

const filterButtons = [
  {
      label: 'Live Auctions',
      icon: GiFlame,
      value: 'live'
  },
  {
      label: 'Ending < 6 hours',
      icon: GiFinishLine,
      value: 'endingSoon'
  },
  {
      label: 'Completed',
      icon: BsStopwatchFill,
      value: 'finished'
  },
]

const Filters = () => {
  const setParams = useParamsStore(state => state.setParams);
  //const orderBy = useParamsStore(state => state.orderBy);
  const [selectedOption, setSelectedOption] = useState('option1');

 const handleChange = (event: any) => {
    setParams({Type : event.target.value});
    
 };
  
  return (
  //   <div className='flex justify-between items-center mb-4'>
  //       <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row'>
  //         <span className='uppercase text-sm text-gray-500 mr-2 sm:mr-4'>Order by:</span>
  //         <div className="order-buttons flex flex-col sm:flex-row">
  //             {orderButtons.map(({ label, icon: Icon, value }) => (
  //               <button 
  //                 className="btn btn-outline btn-info btn-xs ml-4 sm:ml-6"
  //                 key={value}
  //                 onClick={() => setParams({ orderBy: value })}
  //               >
  //                 {label} <Icon className='mr-3 h-4 w-4' />
  //               </button>
  //             ))}
  //         </div>            
  //       </div>

  //       <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row'>
  //         <span className='uppercase text-sm text-gray-500 mr-2 sm:mr-4'>Order by:</span>
  //         <div className="order-buttons flex flex-col sm:flex-row">
  //             {filterButtons.map(({ label, icon: Icon, value }) => (
  //               <button 
  //                 className="btn btn-outline btn-primary btn-xs ml-4 sm:ml-6"
  //                 key={value}
  //                 onClick={() => setParams({ filterBy: value })}
  //               >
  //                 {label} <Icon className='mr-3 h-4 w-4' />
  //               </button>
  //             ))}
  //         </div>
  //       </div>

  //     <div>
  //       <select className="select select-bordered w-full select-sm max-w-xs" value={selectedOption} onChange={handleChange}>
  //         <option value="">Category</option>
  //         <option value="Automobile">Automobile</option>
  //         <option value="Clothes">Clothes</option>
  //         <option value="Electronics">Electronics</option>
  //       </select>
  //     </div>
  // </div>

  <div className='grid mb-5 grid-cols-1 md:grid-cols-3 gap-4'>

    <div className='flex flex-col'>
      <span className='uppercase mb-2 text-sm text-gray-500 mr-2 sm:mr-4'>Order by:</span>
      <div className="order-buttons flex flex-col sm:flex-row">
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <button 
              className="btn btn-outline btn-info btn-xs ml-4 sm:ml-6"
              key={value}
              onClick={() => setParams({ orderBy: value })}
            >
              {label} <Icon className='mr-3 h-4 w-4' />
            </button>
          ))}
      </div>            
    </div>

    <div className='flex flex-col'>
      <span className='uppercase mb-2 text-sm text-gray-500 mr-2 sm:mr-4'>Filter by:</span>
      <div className="order-buttons flex flex-col sm:flex-row">
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <button 
              className="btn btn-outline btn-primary btn-xs ml-4 sm:ml-6"
              key={value}
              onClick={() => setParams({ filterBy: value })}
            >
              {label} <Icon className='mr-3 h-4 w-4' />
            </button>
          ))}
      </div>
    </div>

    <div>
      <select className="select select-bordered w-full select-sm max-w-xs" value={selectedOption} onChange={handleChange}>
        <option value="">Category</option>
        <option value="Automobile">Automobile</option>
        <option value="Clothes">Clothes</option>
        <option value="Electronics">Electronics</option>
        <option value="Kids">Kids Section</option>
      </select>
    </div>
  </div>

    
  )
}

export default Filters