import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../css/Dashboard.css'

export const NavbarPartner = () => {
    return (
        <>
            <nav className="navbar navbar-dark bgGreen fixed-top" aria-label="Dark offcanvas navbar">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand fontReciba" href="#">RECIBA</a>
                    <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header">
                            <h2 className="offcanvas-title fontReciba fw-bold fs-1" id="staticBackdropLabel" style={{ color: '#086c3c' }}><u>RECIBA</u></h2>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body fontTextReciba">
                            <div>

                                <h3 className='fw-bold' style={{ color: '#086c3c' }}>My Rewards</h3>


                                <Link to='addReward' className='optionSidebar'>
                                    <h6>Create Rewards</h6>
                                </Link>

                                <Link to='viewReward' className='optionSidebar'>
                                    <h6>View Rewards</h6>
                                </Link>

                                <h3 className='fw-bold mt-3' style={{ color: '#086c3c' }}>Statistics</h3>
                                <Link className='optionSidebar'>
                                    <h6>Watch my rewards stats</h6>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section id=''>

            </section>
        </>

    )
}
