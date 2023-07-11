import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { NotFound } from './pages/NotFound/NotFound'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/HomePage/LoginPage'
import { AboutUsPage } from './pages/HomePage/AboutUsPage'
import { MasterDashboard } from './pages/Master/MasterDashboard'
import React, { createContext, useEffect, useState } from 'react'
import { UserHomePage } from './pages/User/UserHomePage'
import { RecyclerDashboard } from './pages/Recycler/RecyclerDashboard'
import { PartnerDashboard } from './pages/Partner/PartnerDashboard'

export const AuthContext = createContext()

export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState()

    useEffect(() => {
        let token = localStorage.getItem('token')
        let user = localStorage.getItem('user')

        token ? setLoggedIn(true) : setLoggedIn(false)
        if (user) setDataUser(JSON.parse(user))
    }, [])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound/>,
            children: [
                {
                    path: '/',
                    element: <HomePage/>
                },
                {
                    path: '/about',
                    element: <AboutUsPage/>
                },
                {
                    path: '/login',
                    element: <LoginPage/>
                },
                {
                    path: '/master',
                    element: loggedIn ? (dataUser?.role === 'MASTER' ? <MasterDashboard/> : <NotFound/>) : (<LoginPage/>),
                    children: []
                },
                {
                    path: '/home',
                    element: loggedIn ? (dataUser?.role === 'CLIENT' ? <UserHomePage/> : <NotFound/>) : (<LoginPage/>),
                    children: []
                },
                {
                    path: '/recycler',
                    element: loggedIn ? (dataUser?.role === 'RECYCLER' ? <RecyclerDashboard/> : <NotFound/>) : (<LoginPage/>),
                    children: []
                },
                {
                    path: '/partner',
                    element: loggedIn ? (dataUser?.role === 'PARTNER' ? <PartnerDashboard/> : <NotFound/>) : (<LoginPage/>),
                    children: []
                }
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )

}