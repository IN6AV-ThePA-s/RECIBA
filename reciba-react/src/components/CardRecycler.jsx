import React from 'react'
import c1 from '../assets/c1.jpg'
import '../css/UserHomePage.css'

export const CardRecycler = ({ name, direction, id, email, phone, startHour, endHour }) => {
    return (
        <div className='col'>
            <div className=" rounded-3 shadow-lg transitionY">
                <div className="row g-0 align-items-center">
                    <div className="col-sm-5">
                        <img
                            src={c1}
                            className="img-fluid rounded-start"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '30vh'
                            }}
                        />
                    </div>
                    <div className="col-sm-7 px-4">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-subtitle mb-2 text-body-secondary">{direction}</p>
                            <span class="badge bg-success">Info</span>
                            <p className="card-text"><small className="text-body-secondary">Open: {startHour}hrs - {endHour}hrs</small></p>
                            <span class="badge bg-dark">Contact</span>
                            <p className="card-text mb-0"><small className="text-body-secondary">Email: {email}</small></p>
                            <p className="card-text"><small className="text-body-secondary">Phone: {phone}</small></p>
                            
                            <div class="d-grid gap-2">
                                <button type="button" class="btn btn-outline-success">Visit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
