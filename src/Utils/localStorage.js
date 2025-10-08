export const getInstalledApps = () => {
    const data = localStorage.getItem('installedApps');
    return data ? JSON.parse(data) : [];
};

export const addInstalledApp = (app) => {
    const current = getInstalledApps();
    const exists = current.find(a => a.id === app.id);
    if (!exists) {
        const updated = [...current, app];
        localStorage.setItem('installedApps', JSON.stringify(updated));
    }
};

export const removeInstalledApp = (id) => {
    const current = getInstalledApps();
    const updated = current.filter(a => a.id !== id);
    localStorage.setItem('installedApps', JSON.stringify(updated));
};
