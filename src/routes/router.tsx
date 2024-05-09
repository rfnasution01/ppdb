import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage, RootLayout } from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
