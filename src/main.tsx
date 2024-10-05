
import { router } from './navegation/main.tsx'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
 )
 