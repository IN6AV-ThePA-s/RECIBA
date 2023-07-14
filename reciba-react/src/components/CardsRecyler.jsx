import React from 'react'
import '../css/UserHomePage.css'
import c1 from '../assets/c1.jpg'

export const CardsRecyler = ({name, direction, id}) => {
    return (
        <div className="product">
            <div className="image">
                <img src={c1} alt="" />
            </div>
            <div className="namePrice">
                <h3>{name}</h3>
                <span>$ 15.99</span>
            </div>
            <p>{direction}</p>
            <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
            </div>
            <div>
                <button className='btn btn-success'> Visit </button>
            </div>
        </div>
    )
}
