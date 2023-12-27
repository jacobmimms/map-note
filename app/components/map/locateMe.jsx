'use client'
import { useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { LocationContext } from '@/app/providers/locationProvider';
import { useContext } from 'react';
// import useMapPosition from './useMapPosition';

export default function LocateMe() {
    console.log("LocateMe")
    const map = useMap();
    const [disable, setDisable] = useState(false);
    // const [position, setPosition] = useMapPosition();
    const position = useContext(LocationContext);

    function locateUser() {
        setDisable(true);
        map.setView([position.latitude, position.longitude], 14,
            {
                animate: true,
                duration: .5,
            });
        setDisable(false);
    }

    useEffect(() => {
        // get user location from local storage
        const savedLocation = localStorage.getItem('lastLocation');
        if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation);
            map.setView([latitude, longitude], 14);
        }
    }, [location]);

    const disabled = disable ? 'spinner' : 'text-white';

    return (
        <div className='fixed bottom-4 left-4 z-10'>
            <button disabled={disable} onClick={locateUser} className={`bg-slate-800 ${disabled} rounded-full p-2 w-12 h-12 flex items-center justify-center`}>
                <FontAwesomeIcon icon={faLocation} className='w-6 h-6' />
            </button>
        </div >

    );
};

