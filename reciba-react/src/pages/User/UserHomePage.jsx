import React, { useEffect, useState } from 'react'
import { NavbarOffcanvas } from '../../components/NavbarOffcanvas'
import { NavbarUser } from '../../components/NavbarUser'
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import '../../css/UserHomePage.css'
import { CardsRecyler } from '../../components/CardsRecyler'
import axios from 'axios'

export const UserHomePage = () => {

  const [recyclers, setRecyclers] = useState()

  const getRecyclers = async() => {
    try {
        const { data } = await axios(`http://localhost:3033/recycler/get`)

        if (data) {
          console.log('there are');
          return setRecyclers(data.recyclers)
        }
        return console.log('error')
        
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(() => {
    getRecyclers()
  }, [])
  
  
  return (
    <>
      <div>
        <NavbarUser />
      </div>

      <div id="carruselImagenes" className="carousel slide container h-75 my-3 " data-bs-ride="carousel">
        <div className="carousel-inner rounded-4">
          <div id="uno" className="carousel-item active">
            <img src={c1} className="d-block w-100" />
          </div>

          <div id="dos" className="carousel-item">
            <img src={c2} className="d-block w-100" />
          </div>

          <div id="tres" className="carousel-item">
            <img src={c3} className="d-block w-100" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carruselImagenes" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carruselImagenes" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className='contenedor-btn-carousel'>
        <div className="botones-carousel">

          <a className="boton-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="0">
            <img src={c1} width="100%" />
          </a>

          <a className="boton-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="1">
            <img src={c2} width="100%" />
          </a>

          <a className="boton-carousel" data-bs-target="#carruselImagenes" data-bs-slide-to="2">
            <img src={c3} width="100%" />
          </a>

        </div>
      </div>

      {/* Recicladoras */}
      <div className='mainP'>
        <div className='containerP'>

          <div className="header">
            <h1>Recyclers</h1>
          </div>

          <div className="products">

            {
              recyclers?.map(({name, direction, _id}, index) => {
                return (
                  <CardsRecyler 
                    key={index}
                    name={name}
                    direction={direction}
                    id={_id}
                  />
                )
              })
            }

          </div>
        </div>

      </div>


    </>
  )
}
