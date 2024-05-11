import React from 'react'

type Props = {
    amount?: number
    reservePrice: number
}

const CurrentBid = ({amount, reservePrice} : Props) => {
    const text = amount ? '₹' + amount : 'No bids';
    const color = 'bg-neutral'

  return (
    <div className={`
            border-2 border-white text-white py-1 px-2 rounded-lg flex
            justify-center ${color}
        `}>
            Current Bid : {text}
        </div>
  )
}

export default CurrentBid