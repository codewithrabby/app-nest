import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import downloadIcon from '../../assets/icon-downloads.png';
import ratingsIcon from '../../assets/icon-ratings.png';
import reviewIcon from '../../assets/icon-review.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getInstalledApps, addInstalledApp, removeInstalledApp } from '../../Utils/localStorage.js';
import toast, { Toaster } from 'react-hot-toast';

const AppDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    fetch('/appsData.json')
      .then(res => res.json())
      .then(data => {
        const selectedApp = data.find(app => app.id === parseInt(id));
        setApp(selectedApp);

        const installedApps = getInstalledApps();
        if (installedApps.find(a => a.id === parseInt(id))) {
          setIsInstalled(true);
        }
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

  const handleInstall = () => {
    addInstalledApp(app);
    setIsInstalled(true);
    toast.success(`${app.title} installed successfully!`);
  };

  const handleUninstall = () => {
    removeInstalledApp(app.id);
    setIsInstalled(false);
    toast(`${app.title} uninstalled`, { icon: '🗑️' });
  };

  const ratingsData = [
    { name: '5★', value: app.ratingAvg >= 4.5 ? 80 : 60 },
    { name: '4★', value: app.ratingAvg >= 4 ? 60 : 50 },
    { name: '3★', value: 40 },
    { name: '2★', value: 20 },
    { name: '1★', value: 10 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-xl">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ------------------ Section 1 ------------------ */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={app.image}
          alt={app.title}
          className="w-48 h-48 object-contain rounded-lg shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#001931] mb-1">{app.title}</h1>
          <h2 className="text-lg text-[#627382] mb-3">{app.companyName}</h2>

          <div className="border-b-2 border-gray-200 mb-4"></div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full">
              <img src={downloadIcon} alt="" className="w-4 h-4" /> {app.downloads} Downloads
            </span>
            <span className="flex items-center gap-2 text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
              <img src={ratingsIcon} alt="" className="w-4 h-4" /> {app.ratingAvg} Avg Rating
            </span>
            <span className="flex items-center gap-2 text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              <img src={reviewIcon} alt="" className="w-4 h-4" /> {app.reviews} Reviews
            </span>
          </div>

          <div className="flex items-center gap-4">
            {!isInstalled ? (
              <button
                onClick={handleInstall}
                className="px-6 py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-lg hover:opacity-90 transition"
              >
                Install Now {app.size}
              </button>
            ) : (
              <button
                onClick={handleUninstall}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Uninstall
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-b-2 border-gray-200 my-8"></div>

      {/* ------------------ Section 2 ------------------ */}
      <div>
        <h3 className="text-2xl font-semibold text-[#001931] mb-4">User Ratings Overview</h3>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart
              data={ratingsData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" radius={[5, 5, 5, 5]}>
                {ratingsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#4ade80', '#a3e635', '#facc15', '#fb923c', '#f87171'][index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-b-2 border-gray-200 my-8"></div>

      {/* ------------------ Section 3 ------------------ */}
      <div>
        <h3 className="text-2xl font-semibold text-[#001931] mb-4">About This App</h3>
        <p className="text-gray-700 leading-relaxed">{app.description}</p>
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          to="/installedList"
          className="px-6 py-3 border border-[#632EE3] text-[#632EE3] rounded-lg hover:bg-[#632EE3] hover:text-white transition"
        >
          Go to Installed Apps →
        </Link>
      </div>
    </div>
  );
};

export default AppDetail;
