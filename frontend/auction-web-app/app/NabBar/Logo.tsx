'use client'

import { useParamsStore } from '@/hooks/useZustandStore';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'
import { GiShop } from 'react-icons/gi';

const Logo = () => {
  // const router = useRouter();
  // const pathname = usePathname();
  const reset = useParamsStore(state => state.reset);

  // function doReset() {
  //     if (pathname !== '/') router.push('/');
  //     reset();
  // }
  return (
    <div>
        <Link href={`/`}>
                <div className='cursor-pointer flex items-center space-x-4 md:space-x-2' onClick={reset}>
                    <GiShop className='text-4xl md:text-2xl'/>
                    <h4 className='text-3xl md:text-xl font-bold'>FleaMart</h4>
                </div>
            </Link>
    </div>
  )
}

export default Logo