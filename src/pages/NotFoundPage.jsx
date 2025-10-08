import React from "react";
import notFoundImg from "../assets/App-Error.png";
import { Link } from "react-router";

const NotFoundPage = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-center p-4">
            <img src={notFoundImg} alt="Not Found" className="w-48 sm:w-60 md:w-72 mb-6"/>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#001931] mb-2"> {message || "Oops! Page Not Found"}</h1>
            <p className="text-gray-500 text-base sm:text-lg mb-6"> The app you’re looking for doesn’t exist or has been removed.</p>
            <Link to="/" className="px-6 py-3 bg-[#632EE3] text-white rounded-lg hover:opacity-90 transition"> Back to Home </Link>
        </div>
    );
};

export default NotFoundPage;
