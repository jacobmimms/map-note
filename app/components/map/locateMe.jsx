'use client'
import { useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function LocateMe() {
    const map = useMap();
    const [disable, setDisable] = useState(false);

    function locateUser() {
        setDisable(true);
        map.locate({
            setView: true,
            maxZoom: 14,
        });
        map.on('locationfound', () => {
            setDisable(false);
        });
    }

    const disabled = disable ? 'spinner' : 'text-white';

    return (
        <div className='fixed bottom-4 left-4'>
            <button disabled={disable} onClick={locateUser} className={`bg-slate-700 ${disabled} rounded-full p-2 w-12 h-12 flex items-center justify-center`}>
                <FontAwesomeIcon icon={faLocation} className='w-6 h-6' />
            </button>
        </div >

    );
};

