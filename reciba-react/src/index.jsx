import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

export const Index = () => {

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />
            /* children: [
                {
                    path: '/',
                    element: <HomePage />
                }
            ] */
        }
    ])

    return (
        <RouterProvider router={routes} />
    )

}