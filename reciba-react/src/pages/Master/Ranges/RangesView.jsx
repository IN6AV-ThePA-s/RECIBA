import React, { useEffect, useState } from 'react'
import { RangeCard } from '../../../components/ranges/RangeCard'
import Swal from 'sweetalert2'
import axios from 'axios'

const HOST = Object.freeze({ url: 'http://localhost:3033' })

export const RangesView = () => {
    const [ranges, setRanges] = useState()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getRanges = async () => {
        try {
            const { data } = await axios(`${HOST.url}/range/get`, { headers: headers })

            if (data) {
                setRanges(data.range)
            }

        } catch (err) {
            console.error(err)
            Swal.fire(err.response.data.message, '', 'error')
        }
    }

    useEffect(() => {
        getRanges()
    }, [])


    return (
        <div className='container mx-auto my-5'>
            <h1 className='py-1 px-4 text-success'>
                Ranges
            </h1>

            <hr className='mb-5' />

            <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
                {
                    ranges?.map(({ _id, name, initExp, limitExp, photo }, index) => {
                        return (
                            <RangeCard
                                id={_id}
                                name={name}
                                initExp={initExp}
                                limitExp={limitExp}
                                photo={photo}
                                key={index}
                            />
                        )
                    })
                }

            </div>
        </div>

    )
}
