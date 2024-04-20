"use client"
import { useParamsStore } from '@/hooks/useZustandStore';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { GiShop } from 'react-icons/gi';

const Search = () => {
const setParams = useParamsStore(state => state.setParams);
//const [value, setValue] = useState('');
const setSearchVal = useParamsStore(state=> state.setSearchVal)
const searchVal = useParamsStore(state => state.searchVal)

function onChange(event: any){
  setSearchVal(event.target.value);
};


function search(){
  setParams({searchTerm: searchVal});
}

  return (
    <>
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input
                onKeyDown={(e: any)=> {
                  if(e.key === 'Enter') search()
                }}
                value={searchVal}
                onChange={onChange}
                type="text"
                placeholder='Search ...'
                className='
                flex-grow
                pl-5
                bg-transparent
                focus:outline-none
                border-transparent
                focus:border-transparent
                focus:ring-0
                text-sm
                text-gray-600
            '
            />
            <button onClick={search}>
                <FaSearch
                    size={34}
                    className='bg-blue-700 text-white rounded-full p-2 cursor-pointer mx-2' />
            </button>
        </div>
    </>
  )
}


export default Search