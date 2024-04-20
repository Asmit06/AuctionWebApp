"use client"
import React, { useState } from 'react'
import { GiShop } from "react-icons/gi";
import Search from './Search';
import { useParamsStore } from '@/hooks/useZustandStore';
import Link from 'next/link';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const reset = useParamsStore(state => state.reset);
  return (
    <>
        <header className='sticky z-50 top-0 p-6 md:p-3 flex justify-between bg-blue-500 items-center text-white shadow-md'>
            <Link href={`/`}>
                <div className='cursor-pointer flex items-center space-x-4 md:space-x-2' onClick={reset}>
                    <GiShop className='text-4xl md:text-2xl'/>
                    <h4 className='text-3xl md:text-xl font-bold'>FleaMart</h4>
                </div>
            </Link>
            
            <Search />
            <div className='hidden md:block'>Login</div> 
            <div className='md:hidden'>
                    <button className='text-2xl' onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
            {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 pr-10">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
            </ul>
            </div> */}
        </header>

        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className=' p-4 bg-blue-400 rounded'>
                    <div className='text-color-white'>Search</div>
                    <div>Login</div>
                </div>
        </div>
    </>
  )
}

export default NavBar