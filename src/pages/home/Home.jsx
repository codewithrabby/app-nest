import React, { useEffect, useState } from 'react';
import HeroLogo from '../../assets/hero.png';
import googleImg from '../../assets/images.png';
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { Link } from "react-router";

const Home = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        fetch('/appsData.json')
            .then(res => res.json())
            .then(data => setApps(data.slice(0, 8)))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <section className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto min-h-screen px-4">
                <h1 className="text-[#001931] text-7xl font-bold leading-tight">
                    We Build <br />
                    <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
                        Productive
                    </span> Apps
                </h1>
                <p className="text-[#627382] mt-6 text-sm max-w-2xl">
                    At App Nest, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. <br /> 
                    Our goal is to turn your ideas into digital experiences that truly make an impact.
                </p>

                <div className="flex gap-4 mt-8">
                    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                        <img src={googleImg} alt="Google Play" className="w-6 h-6" /> <span>Google Play</span>
                    </a>
                    <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="w-6 h-6"/> <span>App Store</span>
                    </a>
                </div>

                <div className="w-full mt-10">
                    <img src={HeroLogo} alt="Hero" className="w-300px mx-auto"/>
                </div>
            </section>


            <div className="text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] pt-8 pb-8">
                <h2 className="text-center text-5xl font-bold mb-8 mt-10">Trusted by Millions, Built for You</h2>
                <div className="flex justify-around items-center mb-8">
                    <div className="text-center">
                        <p className="text-sm mb-4">Total Download</p>
                        <h1 className="font-extrabold text-6xl mb-2">29.6M</h1>
                        <p className="text-sm mt-4">21% more than last month</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm mb-4">Total Reviews</p>
                        <h1 className="font-extrabold text-6xl mb-2">906K</h1>
                        <p className="text-sm mt-4">46% more than last month</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm mb-4">Active Apps</p>
                        <h1 className="font-extrabold text-6xl mb-2">132+</h1>
                        <p className="text-sm mt-4">31 more will Launch</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
    <h1 className='text-[#001931] text-5xl font-bold text-center mb-4'>Trending Apps</h1>
    <p className='text-[#627382] text-xl text-center mb-6'>Explore All Trending Apps on the Market developed by us</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {apps.map(({ id, img, title, companyName, size, reviews }) => (
            <div key={id} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition">
                <img src={img} alt={title} className="w-24 h-24 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-left mb-2">{title}: {companyName}</h2>
                <div className="flex justify-between items-center w-full text-sm mt-auto">
                    <span className="flex items-center gap-2 text-green-700 bg-green-100 px-2 py-1 rounded">{size}</span>
                    <span className="flex items-center gap-2 text-orange-700 bg-orange-100 px-2 py-1 rounded">{reviews} reviews</span>
                </div>
            </div>
        ))}
    </div>

    <div className="flex justify-center">
        <Link 
            to="/appList" 
            className="text-white px-6 py-3 rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition"
        >
            Show All
        </Link>
    </div>
</div>
        </div>
    );
};

export default Home;
