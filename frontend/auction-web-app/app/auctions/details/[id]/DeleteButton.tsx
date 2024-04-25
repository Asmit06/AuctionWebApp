'use client'
import { deleteAuction } from '@/app/actions/AuctionActiona'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'

type Props = {
    id: string
}

const DeleteButton = ({id} : Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doDelete() {
        if (window.confirm('Are you sure you want to delete this auction?')) {
        setLoading(true);
        deleteAuction(id)
            .then(res => {
                if (res.error) throw res.error;
                router.push('/');
            }).catch(error => {
                toast.error(error.status + ' ' + error.message)
            }).finally(() => setLoading(false)) 
        }
    }
    
  return (
    <button className="btn btn-outline btn-error" onClick={doDelete}>
        <Link className="flex flex-row" href={`/auctions/update/${id}`}>
            <MdDelete  />
            Delete Auction
        </Link>
    </button>
  )
}

export default DeleteButton