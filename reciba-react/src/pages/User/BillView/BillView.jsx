import React, { useState } from 'react'

const HOST = Object.freeze({ url: 'http://localhost:3033' })

export const BillView = () => {
  const [bills, setBills] = useState()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  return (
    <>
      <div className='container'>
        <div className='mt-5'>
          <h1 className='text-success'>Bills history</h1>
        </div>

        <hr className='mb-5' />

        <div className='container'>
          
        </div>
      </div>
    </>
  )
}
