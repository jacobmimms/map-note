'use client'
import { createContext, useReducer, useEffect } from 'react';
import { calculateDistance } from '@/app/utils/main';
import Loading from '@/app/components/animations/loading';

const initialState = {
    location: null,
    prevLocation: null
};

function locationReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_LOCATIONS':
            return {
                ...state,
                prevLocation: state.location, // Previous location becomes current location
                location: action.payload // New location
            };
        default:
            return state;
    }
}

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [locationState, dispatch] = useReducer(locationReducer, initialState);

    const handleSuccess = (position) => {
        if (position && position.coords) {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            };

            if (!locationState.location || calculateDistance(locationState.location, newLocation) >= 50) {
                console.log('updating location')
                localStorage.setItem('lastLocation', JSON.stringify(newLocation));
                dispatch({ type: 'UPDATE_LOCATIONS', payload: newLocation });
            }
        }
    };

    useEffect(() => {
        const watchId = navigator.geolocation && navigator.geolocation.watchPosition(handleSuccess);
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    if (!locationState.location) {
        return <Loading className='fixed w-[80px] h-[80px] inset-x-0 mx-auto inset-y-0 my-auto p-2 rounded-full' />;
    }

    return (
        <LocationContext.Provider value={locationState.location}>
            {children}
        </LocationContext.Provider>
    );
};
