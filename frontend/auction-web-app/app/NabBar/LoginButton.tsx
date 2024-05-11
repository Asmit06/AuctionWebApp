'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

const LoginButton = () => {
  return (
    <>
        <button className="btn btn-ghost" onClick={()=> signIn('id-server', {callbackUrl: '/'}, {prompt: 'login'})}>
            Login
        </button>
    </>
  )
}

export default LoginButton