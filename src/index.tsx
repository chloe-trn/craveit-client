import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './assets/css/index.css'
import App from './App'
import ErrorPage from './pages/error-page/ErrorPage'
import routes from './routes'

// Helper to generate child routes based on routes.tsx
const generateChildRoutes = () => {
  return routes.map((route) => {
    return {
      path: route.path,
      element: route.element
    }
  })
}

// Create a hash router with the root route and child routes
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: generateChildRoutes()
  }
])

// Create a root element to render the app inside of
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)