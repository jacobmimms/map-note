'use client'
import { createContext, useState, useEffect } from 'react';
import { calculateDistance } from '@/app/utils/main';

export const LocationContext = createContext(null);
export const LocationProvider = ({ children }) => {
    const [lastLocation, setLastLocation] = useState(null);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleSuccess = (position) => {
        if (!position.coords) {
            return;
        }
        if (lastLocation) {
            const distance = calculateDistance(lastLocation, position.coords);
            if (distance < 50) {
                console.log('distance is less than 10 meters', distance)
                return;
            }
        }
        console.log('setting location', position.coords, position)
        localStorage.setItem('lastLocation', JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
        setLastLocation(location)
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
        const savedLocation = localStorage.getItem('lastLocation');
        const savedLocationObj = JSON.parse(savedLocation);
        if (savedLocationObj) {
            setLocation(savedLocationObj);
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
