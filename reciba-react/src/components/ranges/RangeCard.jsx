import React from 'react'
import photoError from '../../assets/userDefault.png'
import { Link } from 'react-router-dom';
import { ModalEditRange } from './ModalEditRange';

export const RangeCard = ({ id, name, initExp, limitExp, photo }) => {
    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    return (
        <>
            <div className="col">
                <div className="h-100 transitionY shadow-lg rounded-4">

                    <img
                        src={photo ? `http://localhost:3033/range/getImage/${photo}` : photoError}
                        crossOrigin='anonymous'
                        className="img-fluid rounded-5 shadow rounded-top-4"
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '33vh'
                        }}
                        onError={handleImageError}
                    />

                    <div className="card-body p-4">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">EXP: {`${initExp} - ${limitExp}`}</p>

                    </div>
                    
                    {
                        name === 'ADMIN' ? (
                            <></>
                        ) : (
                            <div className="d-flex justify-content-center mt-1">
                                <button onClick={(e) => { e.preventDefault() }} className="btn btn-outline-danger rounded-pill border-0 pl-2">
                                    <i className="fa-sharp fa-solid fa-trash "
                                        trigger="hover"
                                        style={{ width: '25px', height: '25px' }}>
                                    </i>
                                </button>
                                <Link
                                    type="button"
                                    className="btn btn-outline-primary rounded-pill border-0 mr-2"
                                    data-bs-toggle="modal" data-bs-target={`#modal${id}`}
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wloilxuq.json"
                                        trigger="hover"
                                        stroke="100"
                                        colors="primary:black, secondary:black"
                                        style={{ width: '25px', height: '25px' }}>
                                    </lord-icon>
                                </Link>
                            </div>
                        )
                    }
                    
                    <br />
                </div>
            </div>

            <ModalEditRange 
                id={id}
                name={name}
                initExp={initExp}
                limitExp={limitExp}
                photo={photo}
                key={id}
            />
        </>

    )
}
