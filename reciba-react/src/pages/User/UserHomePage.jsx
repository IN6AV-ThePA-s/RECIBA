import React, { useEffect, useState } from 'react'
import { NavbarOffcanvas } from '../../components/NavbarOffcanvas'
import { NavbarUser } from '../../components/NavbarUser'
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import '../../css/UserHomePage.css'
import axios from 'axios'
import { CardRecycler } from '../../components/recycler/CardRecycler'
import Swal from 'sweetalert2'
import { CardReward } from '../../components/rewards/CardReward'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer'

export const UserHomePage = () => {

  return (
    <>
      <div>
        <NavbarUser />
      </div>

      <div>
        <Outlet/>
      </div>

      <div>
        <Footer/>
      </div>
    </>
  )
}
