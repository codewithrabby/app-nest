import React, { useEffect, useState } from 'react';
import downloadIcon from '../../assets/icon-downloads.png';
import ratingsIcon from '../../assets/icon-ratings.png';
import { FaSearch } from "react-icons/fa";
import notFound from '../../assets/App-Error.png'
import { Link } from "react-router";

const AppList = () => {
    const [apps, setApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('/appsData.json')
            .then((res) => res.json())
            .then((data) => setApps(data))
            .catch((err) => console.error(err));
    }, []);

    const filteredApps = apps.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div>
                <h1 className='text-[#001931] text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center mb-4'> Our All Applications </h1>
                <p className='text-[#627382] text-sm sm:text-base md:text-lg text-center mb-6'> Explore All Apps on the Market developed by us. We code for Millions </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
                <h2 className="text-lg font-medium text-[#001931]">
                    ({filteredApps.length}) Apps Found
                </h2>

                <div className="relative w-full sm:w-64">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input type="text" placeholder="Search apps..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#632EE3] transition"/>
                </div>
            </div>

            {/* App Cards section starts from here... */}
            {filteredApps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredApps.slice(0, 20).map(({ id, image, title, companyName, size, ratingAvg }) => (
                        <Link to={`/app/${id}`} key={id} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition">
                            <img src={image} alt={title} className="w-24 h-24 object-contain mb-4" />
                            <h2 className="text-lg font-semibold text-left mb-2">
                                {title}: {companyName}
                            </h2>
                            <div className="flex justify-between items-center w-full text-xs mt-auto flex-wrap gap-2">
                                <span className="flex items-center gap-2 text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
                                    <img src={downloadIcon} alt="" className="w-4 h-4" />{size}
                                </span>
                                <span className="flex items-center gap-2 text-orange-700 bg-orange-100 px-2 py-1 rounded text-xs">
                                    <img src={ratingsIcon} alt="" className="w-4 h-4" />{ratingAvg} reviews
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                    <img src={notFound} alt="Not Found" className="w-40 sm:w-60 h-40 sm:h-60 mb-4" />
                    <p className="text-gray-500 text-2xl sm:text-3xl font-bold">No Apps Found</p>
                </div>
            )}
        </div>
    );
};

export default AppList;
