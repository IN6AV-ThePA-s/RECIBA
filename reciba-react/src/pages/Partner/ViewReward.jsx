import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthContext } from '../../index'
import { useNavigate } from 'react-router-dom'
import { CardRewardOnly } from '../../components/rewards/CardRewardOnly'

export const ViewReward = () => {
  const [rewards, setRewards] = useState()
  const navigate = useNavigate()
  const { dataUser } = useContext(AuthContext)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getPartnerRewards = async() => {
    try {
      const { data } = await axios.get(`http://localhost:3033/partner/getByUser/${dataUser.sub}`,{headers:headers})
      let partnerId = data.partner._id
      if(data){
        const { data } = await axios.get(`http://localhost:3033/reward/getByPartner/${partnerId}`, { headers: headers })
        if (data) {
          setRewards(data.rewards)
        }
      } 
    } catch (err) {
      console.error(err);
      Swal.fire(err.response.data?.message, '', 'error')
      navigate('/partner')
    }
  }

  const delRewats = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3033/reward/delete/${id}`, { headers: headers })
      getRewards()
      Swal.fire({
        title: 'Deleted',
        text: `Reward "${data.deleteReward.name}" was successfully deleted`,
        icon: 'success'
      })
    } catch (err) {
      console.error(err);
      Swal.fire(err.response.data.message, '', 'error')
    }
  }

  useEffect(() => {
    getPartnerRewards()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-5'>
          <h1 className='text-success'>Rewards</h1>
        </div>

        <hr className='mb-5' />

        <div className='row row-cols-1 row-cols-md-2 g-4 text-center mb-5'>
          {
            rewards?.map(({ name, description, partner, range, cantPoints, photo, _id }, index) => {
              return (
                <CardRewardOnly
                  id={_id}
                  name={name}
                  desc={description}
                  range={range.name}
                  cantPoints={cantPoints}
                  partner={partner}
                  photo={photo}
                  key={index}
                  reload={() => delRewats(_id)}
                />
              )
            })
          }
        </div>
      </div>
    </>
  )
}
