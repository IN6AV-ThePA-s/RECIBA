import React from 'react'
import c1 from '../../assets/c1.jpg'
import '../../css/UserHomePage.css'
import { Link, useNavigate } from 'react-router-dom'

export const CardRecycler = ({ name, direction, id, email, phone, startHour, endHour, photos }) => {

    return (
        <div className='col'>
            <div className="rounded-3 shadow-lg transitionY">
                <div className="row g-0 align-items-center">
                    <div className="col-sm-5">
                        <img
                            src={`http://localhost:3033/recycler/getImage/${photos[0]}`}
                            crossOrigin='anonymous' 
                            className="img-fluid rounded-start"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '33vh'
                            }}
                        />
                    </div>
                    <div className="col-sm-7 p-4">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-subtitle mb-2 text-body-secondary">{direction}</p>
                            <span className="badge bg-success">Info</span>
                            <p className="card-text"><small className="text-body-secondary">Open: {startHour}hrs - {endHour}hrs</small></p>
                            <span className="badge bg-dark">Contact</span>
                            <p className="card-text mb-0"><small className="text-body-secondary">Email: {email}</small></p>
                            <p className="card-text"><small className="text-body-secondary">Phone: {phone}</small></p>
                            
                            <div className="d-grid gap-2">
                                <Link type="button" className="btn btn-outline-success" to={`/home/recyclerview/${id}`}>
                                    Visit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
