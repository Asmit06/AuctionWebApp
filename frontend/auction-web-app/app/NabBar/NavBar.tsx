"use client"
import React, { useState } from 'react'
import { GiShop } from "react-icons/gi";
import Search from './Search';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <header className='sticky z-50 top-0 p-6 md:p-3 flex justify-between bg-blue-500 items-center text-white shadow-md'>
            <div className='flex items-center space-x-4 md:space-x-2'>
                <GiShop className='text-4xl md:text-2xl'/>
                <h4 className='text-3xl md:text-xl font-bold'>FleaMart</h4>
            </div>
            <div className='hidden md:block'>Search</div>
            <div className='hidden md:block'>Login</div>
            <div className='md:hidden'>
                    <button className='text-2xl' onClick={() => setIsOpen(!isOpen)}>☰</button>
            </div>
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