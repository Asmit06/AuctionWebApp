import React, { useState } from 'react'
import { GiShop } from "react-icons/gi";
import Search from './Search';
import { useParamsStore } from '@/hooks/useZustandStore';
import Link from 'next/link';
import LoginButton from './LoginButton';
import { getCurrentuser } from '../actions/AuthActions';
import UserActions from './UserActions';
import Logo from './Logo';
import DynamicButton from './DynamicButton';

const NavBar = async () => {
    const user = await getCurrentuser();
  return (
    <>
        <header className='sticky z-50 top-0 p-6 md:p-3 flex justify-between bg-blue-500 items-center text-white shadow-md'>
            <Logo />
            <Search />
            <div className='ml-5'>
                {user ? <UserActions user={user}/> : <LoginButton />}  
            </div> 
            
            {/* <DynamicButton /> */}
        </header>
    </>
  )
}

export default NavBar