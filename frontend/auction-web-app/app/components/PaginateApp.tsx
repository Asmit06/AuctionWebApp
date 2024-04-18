'use client'
import React, { useState } from 'react'

type Props = {
    currentPage: number
    pageCount: number
    pageChanged: (page : number) => void
}
const PaginateApp = ({ currentPage, pageCount, pageChanged}: Props) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handleNextClick = () => {
    if (pageNumber < pageCount) {
      setPageNumber(pageNumber + 1);
      pageChanged(pageNumber+1);
    }
  };

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      pageChanged(pageNumber-1);
    }
  };

  return (
    <div className="join">
        <button className="join-item btn" onClick={handlePrevClick} disabled={pageNumber === 1}>«</button>
        <button className="join-item btn">{pageNumber}</button>
        <button className="join-item btn" onClick={handleNextClick} disabled={pageNumber === pageCount}>»</button>
    </div>
  )
}

export default PaginateApp