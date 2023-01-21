/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


export default function Pagination(props) {
  const { 
    nPages, 
    currentPage, 
    setCurrentPage, 
    // recordsPerPage, 
    // indexOfFirstRecord, 
    // indexOfLastRecord, 
    // currentRecords 
  } = props;

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a className='page-link'
              onClick={prevPage}
              href="#"> 
              Previous
            </a>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}
              className={`page-item ${currentPage === pageNumber ? 'active' : ''}`} >
              
              <a onClick={() => setCurrentPage(pageNumber)}
                  className="page-link"
                  href="#">
                  {pageNumber}      
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link"
                onClick={nextPage}
                href="#">
                Next
            </a>
          </li>
        </ul>
      </nav>  
  )
}