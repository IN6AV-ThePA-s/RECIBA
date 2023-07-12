import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { NotFound } from './pages/NotFound/NotFound'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/HomePage/LoginPage'
import { AboutUsPage } from './pages/HomePage/AboutUsPage'
import { RecyclerPage } from './pages/Recyler/RecyclerPage'
import { useState } from 'react'
import { HomeRecycler } from './pages/Recyler/HomeRecycler'

export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false)

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
                    path: '/recycler',
                    element: <RecyclerPage/>,/* element: loggedIn ? <ClientPage/> : <LoginPage/>, */
                    children: [
                        {
                            path: 'home',
                            element: <HomeRecycler/>,
                        }

                    ]
                }
            ]
        }
    ])

    return (
        <RouterProvider router={routes} />
    )

}