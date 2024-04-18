"use client"
import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
    imageUrl: string
}

const ImageContainer = ({imageUrl}: Props) => {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
        <Image 
        src={imageUrl} 
        alt="demo" 
        fill
        priority
        className={`
            object-cover
            group-hover: opacity-75
            duration=700
            ease-in-out
            ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100' }
            `}
        sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw'
        onLoad={() => setIsLoading(false)}
        />
    </div>
  )
}

export default ImageContainer