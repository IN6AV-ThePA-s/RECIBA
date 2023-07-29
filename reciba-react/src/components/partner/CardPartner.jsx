import React from 'react'
import '../../css/UserHomePage.css'
import { Link } from 'react-router-dom'

export const CardPartner = ({ id, name, phone, email, address, photo }) => {
    return (
        <div className="col">
            <div className="h-100 transitionY shadow-lg rounded-4">

                <img 
                    src={`http://localhost:3033/partner/getImage/${photo}`}
                    crossOrigin='anonymous' 
                    className="img-fluid rounded-5 shadow rounded-top-4"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '33vh'
                    }}
                />

                <div className="card-body p-4">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{address}</p>

                    <div className="d-grid gap-2">
                        <Link type="button" className="btn btn-outline-success rounded-pill" to={`/home/partnerview/${id}`}>
                            Visit
                        </Link>
                    </div>
                </div>

                <div className="card-footer row p-0">
                    <p className="col-5 text-body-secondary">{phone}</p>
                    <p className="col-7 text-body-secondary">{email}</p>
                </div>
            </div>
        </div>
    )
}
