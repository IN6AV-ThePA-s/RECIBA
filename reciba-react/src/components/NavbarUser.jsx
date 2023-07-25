import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import photoError from '../assets/userDefault.png'
import { AuthContext } from '../index'
import '../css/Dashboard.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const HOST = Object.freeze({ url: 'http://localhost:3033' })

export const NavbarUser = () => {

    const { dataUser } = useContext(AuthContext)
    const [user, setUser] = useState()

    const [exp, setExp] = useState()
    const [limitExp, setLimitExp] = useState()
    
    const [photo, setPhoto] = useState()
    const handleImageError = (e) => {
        e.target.src = photoError;
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getOwn = async() => {
        try {
            const { data } = await axios(`${HOST.url}/user/getOwn`, { headers: headers })

            if (data) {
                let user = data.data[0]
                let perc = 0
                console.log(user)

                let limit = user.range.limitExp - user.range.initExp
                setLimitExp(limit)

                let actual = user.exp

                perc = ((actual - user.range.initExp) * 100 ) / (limit)

                setExp(perc)
                return setUser(user)
            }
            
        } catch (err) {
            console.error(err)
            Swal.fire(err.response.data.message, '', 'error')
        }
    }

    useEffect(() => {
      getOwn()
    }, [])
    

    return (
        <nav className="navbar bg-light navbar-light border-bottom" aria-label="Dark offcanvas navbar">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand fontReciba" to={'/home/page'}>RECIBA</Link>

                <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header">
                        <h2 className="offcanvas-title fontReciba fw-bold fs-1" id="staticBackdropLabel" style={{ color: '#086c3c' }}><u>RECIBA</u></h2>
                        <button type="button" className="btn-close me-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body fontTextReciba">
                        <div>

                            <h3 className='fw-bold' style={{ color: '#086c3c' }}>Actions</h3>

                            <h3 className='fw-bold mt-3' style={{ color: '#086c3c' }}>Bill</h3>
                            <Link className='optionSidebar'>
                                <h6>Created Bills</h6>
                            </Link>
                            <Link className='optionSidebar'>
                                <h6>Add Bill</h6>
                            </Link>

                            <h3 className='fw-bold mt-3' style={{ color: '#086c3c' }}>Material</h3>
                            <Link className='optionSidebar'>
                                <h6>Created Materials</h6>
                            </Link>
                            <Link className='optionSidebar'>
                                <h6>Add Material</h6>
                            </Link>

                            <h3 className='fw-bold mt-3' style={{ color: '#086c3c' }}>Statistics</h3>
                            <Link className='optionSidebar'>
                                <h6>Watch my stats</h6>
                            </Link>

                            <h6>Range: {user?.range.name}</h6>
                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={`${user?.exp}`} aria-valuemin='0' aria-valuemax={`${limitExp}`}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: `${exp}%`}}>{exp}%</div>
                            </div>
                            <h6>{user?.exp} - {user?.range.limitExp} exp</h6>

                        </div>
                    </div>

                    <div className="dropup pb-4 px-4">

                        <Link href="#" role='button' className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={photo || photoError} onError={handleImageError} crossOrigin='anonymous' alt="userFoto" width="35" height="35" className="rounded-circle me-1" />
                            <span className="d-none d-sm-inline mx-1 fs-4">{dataUser.username}</span>
                        </Link>

                        <ul className="dropdown-menu dropdown-menu-dark text-lg shadow" aria-labelledby="dropdownUser1">
                            <li><Link className="dropdown-item" to='settings'>Settings</Link></li>
                            <li><Link className="dropdown-item disabled" href="#">Role: {dataUser.role}</Link></li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><Link className="dropdown-item" href="#">Log Out</Link></li>
                        </ul>

                    </div>

                </div>
            </div>
        </nav>
    )
}
