import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import downloadIcon from '../../assets/icon-downloads.png';
import ratingsIcon from '../../assets/icon-ratings.png';
import reviewIcon from '../../assets/icon-review.png'

const AppDetail = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);

    useEffect(() => {
        fetch('/appsData.json')
        .then(res => res.json())
        .then(data => {
            const selectedApp = data.find(app => app.id === parseInt(id));
            setApp(selectedApp);
        })
        .catch(err => console.error(err));
    }, [id]);

    if (!app) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-2xl font-semibold text-gray-500">Loading app details...</p>
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img src={app.image} alt={app.title} className="w-40 h-40 object-contain rounded-lg"/>
            <div>
            <h1 className="text-4xl font-bold text-[#001931] mb-2">{app.title}</h1>
            <h2 className="text-lg text-[#627382] mb-4">{app.companyName}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{app.description}</p>

            <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full">
                <img src={downloadIcon} alt="" className="w-4 h-4" /> {app.downloads} Downloads
                </span>
                <span className="flex items-center gap-2 text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                <img src={ratingsIcon} alt="" className="w-4 h-4" /> {app.ratingAvg} Average Ratings
                </span>
                <span className="flex items-center gap-2 text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                <img src={reviewIcon} alt="" className="w-4 h-4" /> {app.reviews} Total Reviews
                </span>
            </div>
            </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg hover:opacity-90 transition"> Install App </a> 
        
        <Link to="/appList" className="px-6 py-3 border border-[#632EE3] text-[#632EE3] rounded-lg hover:bg-[#632EE3] hover:text-white transition">← Back to All Apps </Link>
        </div>
    </div>
    );
};

export default AppDetail;
