import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home/Home.jsx'
import AppList from './pages/AppList/AppList.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [{
      path: "/",
      index: true,
      element: <Home></Home>,
    },
    {
      path: "appList",
      element: <AppList></AppList>,
    }
  ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App></App>
    </RouterProvider>
  </StrictMode>,
)
