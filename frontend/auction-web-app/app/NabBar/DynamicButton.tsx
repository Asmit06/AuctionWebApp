'use client'
import React, { useState } from 'react'

const DynamicButton = () => {
  return (
    // <div className='md:hidden'>
    //                 <button className='text-2xl' onClick={() => setIsOpen(!isOpen)}>☰</button>
    // </div>
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">☰</div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Login</a></li>
      </ul>
    </div>
  )
}

export default DynamicButton