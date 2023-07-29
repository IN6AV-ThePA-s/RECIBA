import React from 'react'
import c3 from '../../assets/c3.jpg'
import '../../css/UserHomePage.css'

export const CadMaterial = ({ _id, type, price, unit, photo, recycle }) => {
    return (
        <div className="col">
            <div className="p-4 rounded-4 h-100 shadow transitionY">
                <img
                    src={`http://localhost:3033/material/getImage/${photo}`}
                    crossOrigin='anonymous' 
                    className="card-img-top rounded-4 img-fluid"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '25vh'
                    }}
                />
                <div className="card-body text-center my-3">
                    <h1 className="card-title">{type}</h1>
                    <p className="card-text mt-3"><span class="badge bg-secondary">{price.quantity} {unit}</span> - <span class="badge bg-success">Q{price.amount}</span></p>
                </div>

            </div>
        </div>
    )
}
