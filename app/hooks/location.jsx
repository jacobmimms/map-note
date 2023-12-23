'use client'
import React, { useState, useEffect, createContext, useContext } from "react";

const MIN_DISTANCE = 10;

function getDistance(location1, location2) {
    if (!location1 || !location2) return MIN_DISTANCE + 1;
    // calculate distance between two points
    const { latitude: lat1, longitude: lon1 } = location1;
    const { latitude: lat2, longitude: lon2 } = location2;

    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;
    const distance = R * 2 * Math.asin(Math.sqrt(a));
    return distance;
}

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [pastLocation, setPastLocation] = useState({ lat: 0, long: 0 });
    const [locationSet, setLocationSet] = useState(false);

    useEffect(() => {
        console.log("useEffect in location.jsx")
        if (getDistance(location, pastLocation) < MIN_DISTANCE) {

            "location is the same as past location"
            return;
        }

        navigator.geolocation.getCurrentPosition(

            ({ coords }) => {
                const { latitude, longitude } = coords;
                const newLocation = { latitude, longitude };

                setPastLocation(location);
                setLocation(newLocation);
                setLocationSet(true);
            },
            (error) => {
                console.error("Error getting location", error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

        );
    }, [location, locationSet, pastLocation]);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};

// Create a custom hook that lets the component use location
export const useLocation = () => {
    return useContext(LocationContext);
};