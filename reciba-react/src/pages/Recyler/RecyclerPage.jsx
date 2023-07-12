import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { NavbarOffcanvas } from '../../components/NavbarOffcanvas'

export const RecyclerPage = () => {
    return (
        <>
        
            <div>
                <NavbarOffcanvas />
            </div>

            {/* CONTENIDO */}
            <div className='' style={{ marginTop: '75px' }}>

                <Outlet/>

            </div>

        </>
    )
}
