import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const RecyclerView = () => {
  const { id } = useParams()
  const [recycler, setRecycler] = useState()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getRecycler = async () => {
    try {
      const { data } = await axios(`http://localhost:3033/recycler/getOne/${id}`, { headers: headers })

      if (data) {
        return setRecycler(data.recycler)
      }

    } catch (err) {
      console.error(err)
      Swal.fire(err.response.data.message, '', 'error')
    }
  }

  useEffect(() => {
    getRecycler()
  }, [])


  return (
    <>
      <div>{recycler?.name}'s' View</div>
    </>
  )
}
