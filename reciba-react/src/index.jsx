import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { NotFound } from './pages/NotFound/NotFound'
import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/HomePage/LoginPage'
import { AboutUsPage } from './pages/HomePage/AboutUsPage'

export const Index = () => {

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
                }
            ]
        }
    ])

    return (
        <RouterProvider router={routes} />
    )

}