import React from 'react'
import c2 from '../../assets/c2.jpg'
import '../../css/UserHomePage.css'
import { Link } from 'react-router-dom'

export const CardReward = ({ name, desc, partner, range, cantPoints, photo, _id }) => {
    return (
        <div className='col'>
            <div className="rounded-5 shadow-lg transitionY">
                <div className="row g-0 align-items-center">
                    <div className="col-sm-5">
                        <img
                            src={c2}
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

                            <div className="d-grid gap-2">
                                <Link type="button" className="btn btn-outline-warning rounded-pill">Claim</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
