
import { Outlet } from 'react-router'
import './App.css'
import logo from './assets/logo.png'
import { FaGithub } from "react-icons/fa";

function App() {


  return (
    <>
      <nav className="flex justify-between items-center max-w-7xl mx-auto h-[80px] px-6">
  <div className="flex items-center gap-2">
    <img src={logo} alt="logo" className="w-10 h-10" />
    <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
  App Nest
</h3>

  </div>

  <div className="flex items-center gap-8 text-lg font-medium">
    <a href="#">Home</a>
    <a href="#">Apps</a>
    <a href="#">Installation</a>
  </div>

  <div className="flex items-center gap-3">
    <button className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition">
  <FaGithub className="text-2xl" />
  Contribute
</button>

  </div>
</nav>




      <Outlet></Outlet>
      <h1>Footer</h1>
    </>
  )
}

export default App
