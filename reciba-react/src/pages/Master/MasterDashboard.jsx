import React from 'react'
import { NavbarUser } from '../../components/NavbarUser'
import { Outlet } from 'react-router-dom'

export const MasterDashboard = () => {
  return (
    <>
      <div>
        <NavbarUser />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}
