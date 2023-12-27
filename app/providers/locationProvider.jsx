'use client'
import { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleSuccess = (position) => {
        localStorage.setItem('location', JSON.stringify(position));
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
        });
    };

    const handleError = (error) => {
        setLocation({
            latitude: null,
            longitude: null,
            error: error.message
        });
    };

    useEffect(() => {
        let watchId;

        if (!navigator.geolocation) {
            setLocation({ latitude: null, longitude: null, error: "Geolocation is not supported by your browser" });
        } else {
            watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);
        }
        const savedLocation = localStorage.getItem('location');
        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        }
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };

    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};
