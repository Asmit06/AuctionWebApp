'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

type Props = {
    title?: string
    subtitle?: string
    showLogin?: boolean
    callbackUrl?: string
}

const Overwrite = ({title, subtitle, showLogin, callbackUrl}: Props) => {
  return (
    <div >
        <h1 className='center'>{title}</h1>
        <p className='center'>{subtitle}</p>
        <div className='mt-4'>
        {showLogin && (
        <button onClick={() => signIn('id-server', {callbackUrl})}>Login</button>)}
        </div>
    </div>
  )
}

export default Overwrite