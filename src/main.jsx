import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home/Home.jsx'
import AppList from './pages/AppList/AppList.jsx'
import InstalledList from './pages/installedList/InstalledList.jsx'
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
    },
    {
      path: "installedList",
      element: <InstalledList></InstalledList>,
    },
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
