import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import downloadIcon from '../../assets/icon-downloads.png';
import ratingsIcon from '../../assets/icon-ratings.png';
import reviewIcon from '../../assets/icon-review.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getInstalledApps, addInstalledApp, removeInstalledApp } from '../../Utils/localStorage.js';
import toast, { Toaster } from 'react-hot-toast';
import NotFoundPage from '../NotFoundPage.jsx';

const AppDetail = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch('/appsData.json')
        .then(res => res.json())
        .then(data => {
            const selectedApp = data.find(app => app.id === parseInt(id));

            if (!selectedApp) {
        setNotFound(true);
        return;
    }

            setApp(selectedApp);

            const installedApps = getInstalledApps();
            if (installedApps.find(a => a.id === parseInt(id))) {
            setIsInstalled(true);
            }
        })
        .catch(err => console.error(err));
    }, [id]);

    if (notFound) {
    return <NotFoundPage message="App not found!" />;
}

    if (!app) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl sm:text-2xl font-semibold text-gray-500">Loading app details...</p>
        </div>
        );
    }

    const handleInstall = () => {
        addInstalledApp(app);
        setIsInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    const handleUninstall = () => {
        removeInstalledApp(app.id);
        setIsInstalled(false);
        toast(`${app.title} uninstalled`);
    };

    const ratingsData = [
        { name: '5★', value: app.ratingAvg >= 4.5 ? 80 : 60 },
        { name: '4★', value: app.ratingAvg >= 4 ? 60 : 50 },
        { name: '3★', value: 40 },
        { name: '2★', value: 20 },
        { name: '1★', value: 10 },
    ];

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 mt-8 sm:mt-10 bg-white shadow-lg    rounded-xl">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <img src={app.image} alt={app.title} className="w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 object-contain rounded-lg shadow-md"/>

            <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001931] mb-1">{app.title}</h1>
                <h2 className="text-sm sm:text-base md:text-lg text-[#627382] mb-3">Developed By: {app.companyName}</h2>

                <div className="border-b-2 border-gray-200 mb-4"></div>

                <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm md:text-base">
                <span className="flex items-center gap-1 sm:gap-2 text-green-700 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                <img src={downloadIcon} alt="" className="w-3 sm:w-4 h-3 sm:h-4" /> {app.downloads} Downloads
                </span>
                <span className="flex items-center gap-1 sm:gap-2 text-orange-700 bg-orange-100 px-2 sm:px-3 py-1 rounded-full">
                <img src={ratingsIcon} alt="" className="w-3 sm:w-4 h-3 sm:h-4" /> {app.ratingAvg} Avg Rating
                </span>
                <span className="flex items-center gap-1 sm:gap-2 text-purple-700 bg-purple-100 px-2 sm:px-3 py-1 rounded-full">
                <img src={reviewIcon} alt="" className="w-3 sm:w-4 h-3 sm:h-4" /> {app.reviews} Reviews
                </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                {!isInstalled ? (
                <button onClick={handleInstall} className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg hover:opacity-90 transition"> Install Now ({app.size}) </button>
            ) : (
                <button onClick={handleUninstall} className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Installed</button>
            )}
            </div>
            </div>
        </div>

        <div className="border-b-2 border-gray-200 my-6 sm:my-8"></div>

        <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#001931] mb-4">User Ratings Overview</h3>
            <div className="w-full h-64 sm:h-72 md:h-80">
            <ResponsiveContainer>
                <BarChart data={ratingsData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }} >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[5, 5, 5, 5]}>
                    {ratingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#4ade80', '#a3e635', '#facc15', '#fb923c', '#f87171'][index]} />
                    ))}
                </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>

        <div className="border-b-2 border-gray-200 my-6 sm:my-8"></div>


        <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#001931] mb-4">About This App</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{app.description}</p>
        </div>

        <div className="mt-6 sm:mt-10 flex justify-end">
            <Link to="/installedList" className="px-4 sm:px-6 py-2 sm:py-3 border border-[#632EE3] text-[#632EE3] rounded-lg hover:bg-[#632EE3] hover:text-white transition"> Go to Installed Apps → </Link>
        </div>
        </div>
    );
};

export default AppDetail;
