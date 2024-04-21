import Overwrite from '@/app/components/Overwrite' 
import React from 'react'

const page = ({searchParams}: {searchParams: {callbackUrl: string}}) => {
  return (
    <div>
        <Overwrite 
        title='You need to be logged in to do that'
        subtitle='Please click below to sign in'
        showLogin
        callbackUrl={searchParams.callbackUrl}
    />
    </div>
  )
}

export default page
