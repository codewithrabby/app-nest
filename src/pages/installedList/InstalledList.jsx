import React, { useEffect, useState } from 'react';
import { getInstalledApps, removeInstalledApp } from '../../Utils/localStorage.js';
import toast, { Toaster } from 'react-hot-toast';
import downloadIcon from '../../assets/icon-downloads.png';
import ratingsIcon from '../../assets/icon-ratings.png';

const InstalledList = () => {
    const [installedApps, setInstalledApps] = useState([]);
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        setInstalledApps(getInstalledApps());
    }, []);

    const handleUninstall = (id, title) => {
        removeInstalledApp(id);
        setInstalledApps(getInstalledApps());
        toast(`${title} Uninstalled`);
    };

    const handleSort = (option) => {
        setSortOption(option);
        let sorted = [...installedApps];
        if (option === 'downloadsLowHigh') {
            sorted.sort((a, b) => parseInt(a.downloads) - parseInt(b.downloads));
        } else if (option === 'downloadsHighLow') {
            sorted.sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads));
        }
        setInstalledApps(sorted);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Title  section starts from here... */}
            <div className="text-center mb-8">
                <h1 className="text-[#001931] text-5xl font-bold mb-4">Your Installed Apps</h1>
                <p className="text-[#627382] text-xl">Explore all the apps you’ve installed from our store.</p>
            </div>

            {/* Top section starts from here... */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
                <h2 className="text-lg font-medium text-[#001931]">
                    ({installedApps.length}) Apps Found
                </h2>

                {/* Dropdown section starts from here... */}
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-[#001931] font-medium"> Sort by: </label>
                    <select id="sort" value={sortOption} onChange={(e) => handleSort(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#001931] focus:outline-none focus:ring-2 focus:ring-[#632EE3]">
                        <option value="default">Default</option>
                        <option value="downloadsLowHigh">(Low → High)</option>
                        <option value="downloadsHighLow">(High → Low)</option>
                    </select>
                </div>
            </div>

            <hr className="border-gray-300 mb-6" />

            {/* Card section starts from here... */}
            {installedApps.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No installed apps yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {installedApps.map((app) => (
                        <div
                            key={app.id}
                            className="bg-white shadow-md border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center hover:shadow-lg transition">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img src={app.image} alt={app.title} className="w-20 h-20 object-contain rounded-lg"/>
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-xl font-semibold text-[#001931]">{app.title}</h2>
                                    <p className="text-[#627382] text-sm mb-2">{app.companyName}</p>

                                    <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
                                        <span className="flex items-center gap-2">
                                            <img src={downloadIcon} alt="" className="w-4 h-4" /> {app.downloads}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <img src={ratingsIcon} alt="" className="w-4 h-4" /> {app.ratingAvg}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            {app.size}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => handleUninstall(app.id, app.title)} className="mt-4 sm:mt-0 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"> Uninstall</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstalledList;
