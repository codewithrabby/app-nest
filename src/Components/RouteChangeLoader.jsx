import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingSpinner from "../pages/LoadingSpinner.jsx";

export default function RouteChangeLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const t = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(t);
    }, [location]);

    return loading ? <LoadingSpinner /> : null;
}
