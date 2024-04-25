'use client'

import Link from 'next/link'
import React from 'react'
import { CiEdit } from "react-icons/ci";

type Props = {
    id: string
}

export default function EditButton({id}: Props) {
  return (
    <button className="btn btn-outline btn-success">
        <Link className="flex flex-row" href={`/auctions/update/${id}`}>
            <CiEdit />
            Update Auction
        </Link>
    </button>
  )
}