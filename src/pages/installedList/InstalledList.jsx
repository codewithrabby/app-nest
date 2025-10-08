import React, { useEffect, useState } from 'react';
import { getInstalledApps, removeInstalledApp } from '../../Utils/localStorage.js';
import toast, { Toaster } from 'react-hot-toast';

const InstalledList = () => {
    const [installedApps, setInstalledApps] = useState([]);

    useEffect(() => {
        setInstalledApps(getInstalledApps());
    }, []);

    const handleUninstall = (id, title) => {
        removeInstalledApp(id);
        setInstalledApps(getInstalledApps());
        toast(`${title} Uninstalled`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
        <Toaster position="top-center" reverseOrder={false} />

        <div>
            <h1 className="text-[#001931] text-5xl font-bold text-center mb-4">Your Installed Apps</h1>
            <p className="text-[#627382] text-xl text-center mb-10">Explore all the apps you’ve installed from our store.</p>
        </div>

        {installedApps.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No installed apps yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedApps.map((app) => (
            <div key={app.id} className="bg-white shadow-lg p-5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <img src={app.image} alt={app.title} className="w-24 h-24 object-contain mb-3" />
                <h2 className="text-xl font-semibold text-[#001931]">{app.title}</h2>
                <p className="text-[#627382] text-sm mb-2">{app.companyName}</p>
                <div className="flex justify-center gap-3 text-sm mb-4">
                    <span> {app.ratingAvg}</span>
                    <span> {app.reviews}</span>
                    <span> {app.size} MB</span>
                </div>
                <button onClick={() => handleUninstall(app.id, app.title)} className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"> Uninstall</button>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default InstalledList;
