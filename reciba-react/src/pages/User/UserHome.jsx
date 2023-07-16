import React, { useEffect, useState } from 'react'
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import '../../css/UserHomePage.css'
import axios from 'axios'
import { CardRecycler } from '../../components/recycler/CardRecycler'
import Swal from 'sweetalert2'
import { CardReward } from '../../components/rewards/CardReward'

export const UserHome = () => {
    const [recyclers, setRecyclers] = useState()
    const [rewards, setRewards] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    
    const getRecyclers = async () => {
        try {
            const { data } = await axios(`http://localhost:3033/recycler/get`, { headers: headers })

            if (data) {
                return setRecyclers(data.recyclers)
            }

        } catch (err) {
            console.error(err)
            Swal.fire(err.response.data.message, '', 'error')
        }
    }

    const getRewards = async () => {
        try {
            const { data } = await axios(`http://localhost:3033/reward/get`, { headers: headers })

            if (data) {
                return setRewards(data.rewards)
            }

        } catch (err) {
            console.error(err)
            Swal.fire(err.response.data.message, '', 'error')
        }
    }

    useEffect(() => {
        getRecyclers()
        getRewards()
    }, [])


    return (
        <>
            {/* Carousel */}
            <div id="carruselImagenes" className="carousel container slide mt-4" data-bs-ride="carousel" style={{ height: '60vh', width: '100%' }}>
                <div className="carousel-inner rounded-4">
                    <div id="uno" className="carousel-item active">
                        <img src={c1} className="d-block" style={{ objectFit: 'cover', width: '100%', height: '60vh' }} />
                    </div>

                    <div id="dos" className="carousel-item">
                        <img src={c2} className="d-block" style={{ objectFit: 'cover', width: '100%', height: '60vh' }} />
                    </div>

                    <div id="tres" className="carousel-item">
                        <img src={c3} className="d-block" style={{ objectFit: 'cover', width: '100%', height: '60vh' }} />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carruselImagenes" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carruselImagenes" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {/* Carousel buttons */}
            <div className='container text-center mt-4 mb-5'>
                <div className='row row-cols-3 row-cols-md-3 g-4'>
                    <a className="col img-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="0" href='#'>
                        <img className=' rounded-4 shadow-lg transitionY' src={c1} width="100%" style={{ objectFit: 'cover', width: '100%', height: '20vh' }} />
                    </a>

                    <a className="col img-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="1" href='#'>
                        <img className=' rounded-4 shadow-lg transitionY' src={c2} width="100%" style={{ objectFit: 'cover', width: '100%', height: '20vh' }} />
                    </a>

                    <a className="col img-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="2" href='#'>
                        <img className=' rounded-4 shadow-lg transitionY' src={c3} width="100%" style={{ objectFit: 'cover', width: '100%', height: '20vh' }} />
                    </a>
                </div>
            </div>

            <br />

            {/* Recyclers */}
            <div className='container mx-auto mt-5'>
                <div className='row align-items-center'>
                    <h1 className='mb-5 col py-1 px-4 text-success'>
                        Most popular recyclers
                    </h1>

                    <div className='mb-5 col-auto text-center text-light'>
                        <h6 className='bg-danger rounded-pill py-1 px-3'>
                            {recyclers?.length} on FIRE!
                        </h6>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {
                        recyclers?.map(({ name, direction, _id, email, phone, startHour, endHour, photos }, index) => {
                            return (
                                <CardRecycler
                                    key={index}
                                    name={name}
                                    direction={direction}
                                    email={email}
                                    id={_id}
                                    phone={phone}
                                    startHour={startHour}
                                    endHour={endHour}
                                    photos={photos}
                                />
                            )
                        })
                    }
                </div>
            </div>

            {/* Rewards */}
            <div className='container mx-auto my-5'>
                <div className='row align-items-center'>

                    <h1 className='mb-5 col py-1 px-4 text-success'>
                        Most popular rewards
                    </h1>

                    <div className='mb-5 col-auto text-center text-light'>
                        <h6 className='bg-danger rounded-pill py-1 px-3'>
                            {rewards?.length} on FIRE!
                        </h6>
                    </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2 g-4 text-center'>
                    {
                        rewards?.map(({ name, description, partner, range, cantPoints, photo, _id }, index) => {
                            return (
                                <CardReward
                                    id={_id}
                                    name={name}
                                    desc={description}
                                    range={range}
                                    cantPoints={cantPoints}
                                    photo={photo}
                                    partner={partner}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
