import React from 'react'
import '../../css/UserHomePage.css'
import { ModalClaimReward } from './ModalClaimReward'

export const CardReward = ({ name, desc, partner, range, cantPoints, photo, id, claims }) => {
    return (
        <>
            <div className='col'>
                <div className="rounded-5 shadow-lg transitionY">
                    <div className="row g-0 align-items-center">
                        <div className="col-sm-5">
                            <img
                                src={`http://localhost:3033/reward/getImage/${photo}`}
                                crossOrigin='anonymous'
                                className="img-fluid rounded-5 shadow"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '30vh'
                                }}
                            />
                        </div>
                        <div className="col-sm-7 p-4">
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-subtitle mb-2 text-body-secondary">{partner.name}</p>
                                <span className="badge bg-warning">Points</span>
                                <h5 className="card-text">{cantPoints} pts</h5>
                                <span className="badge bg-dark">Description</span>
                                <p className="card-text mb-0"><small className="text-body-secondary">{desc}</small></p>
                                <p className="card-text"><small className="text-body-secondary"></small></p>

                                {
                                    claims ? (
                                        <div className="row align-items-center">
                                            <div className='col-sm-6'>
                                                <span className="badge bg-success">Claimed</span>
                                                <h4>{claims}</h4>
                                            </div>

                                            <div className='col-sm-6'>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success rounded-pill"
                                                    data-bs-toggle="modal" data-bs-target={`#modal${id}`}
                                                >
                                                    Claim again
                                                </button>
                                            </div>

                                        </div>
                                    ) : (
                                        <div className="d-grid gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-warning rounded-pill"
                                                data-bs-toggle="modal" data-bs-target={`#modal${id}`}
                                            >
                                                Claim
                                            </button>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalClaimReward
                id={id}
                name={name}
                desc={desc}
                range={range}
                cantPoints={cantPoints}
                photo={photo}
                partner={partner}
                key={id}
            />
        </>

    )
}
