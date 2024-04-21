'use client'

import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiFillCar, AiFillTrophy } from 'react-icons/ai'
import { CiLogout } from 'react-icons/ci'
import { HiCog, HiUser } from 'react-icons/hi'
import { MdOutlineAttachMoney } from 'react-icons/md'

type Props = {
  user: Partial<User>
}

const UserActions = ({user} : Props) => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 bg-blue-500">Welcome {user?.name}</div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-500 bg-blue-700 rounded-box w-52">
        <li><Link href='/'>
          <HiUser /> My Auctions
        </Link></li>
        <li><Link href='/'>
          <AiFillTrophy /> Auction History
        </Link></li>
        <li><Link href='/'>
          <MdOutlineAttachMoney  /> Sell An Item
        </Link></li>
        <li><Link href='/session'>
          <HiCog /> Session (dev only)
        </Link></li>
        
        <li>
          <a onClick={() => signOut({callbackUrl: '/'})}><CiLogout /> Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default UserActions