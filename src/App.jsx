import { NavLink, Outlet } from "react-router";
import "./App.css";
import logo from "./assets/logo.png";
import { FaGithub } from "react-icons/fa";
import RouteChangeLoader from "../src/Components/RouteChangeLoader.jsx";



function App() {
  return (
    <>
      {/* NavBar section starts from here... */}
      <nav className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto h-auto md:h-[80px] px-6 py-4 md:py-0">
        
        {/* Left side.....Logo */}
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer mb-4 md:mb-0">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">App Nest</h3>
        </NavLink>

        {/* Nav Links.... */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 text-lg font-medium mb-4 md:mb-0">
          {["/", "/appList", "/installedList"].map((path, i) => {
            const labels = ["Home", "Apps", "Installation"];
            return (
              <NavLink key={i} to={path} end={path === "/"} className={({ isActive }) => isActive ? "relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-[#632EE3] text-[#632EE3] transition" : "hover:text-[#632EE3] transition" } > {labels[i]}
              </NavLink>
            );
          })}
        </div>

        {/* Contribute Button.... */}
        <div>
          <a href="https://github.com/codewithrabby" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition"> <FaGithub className="text-2xl" /> Contribute </a>
        </div>
      </nav>
      
      <RouteChangeLoader />

      {/* Outlet section starts from here... */}
      <Outlet />


      {/* Footer section starts from here... */}
      <footer className="footer flex flex-col md:flex-row justify-between items-start sm:items-center gap-8 sm:gap-4 bg-[#1E293B] text-white p-10">
        
        <div className="flex flex-col">
          <h6 className="footer-title mb-4 text-xl font-semibold">Services</h6>
          <a className="link link-hover mb-1">Branding</a>
          <a className="link link-hover mb-1">Design</a>
          <a className="link link-hover mb-1">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>

        <div className="flex flex-col">
          <h6 className="footer-title mb-4 text-xl font-semibold">Company</h6>
          <a className="link link-hover mb-1">About us</a>
          <a className="link link-hover mb-1">Contact</a>
          <a className="link link-hover mb-1">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h6 className="footer-title mb-4 text-2xl font-semibold text-center md:text-left">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"> <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path> </svg>
            </a>

            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"> <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path> </svg>
            </a>

            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"> <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path> </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
