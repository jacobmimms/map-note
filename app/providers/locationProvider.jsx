'use client'
import { createContext, useState, useEffect } from 'react';
import { calculateDistance } from '@/app/utils/main';

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [lastLocation, setLastLocation] = useState({ latitude: 0, longitude: 0 });
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleSuccess = (position) => {
        if (!position.coords) {
            return;
        }
        const distance = calculateDistance(lastLocation.latitude, lastLocation.longitude, position.coords.latitude, position.coords.longitude);
        if (distance > 10) {
            localStorage.setItem('lastLocation', JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
            setLastLocation({ latitude: location.latitude, longitude: location.longitude })
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        } else {
            console.log('not setting location')
        }
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
