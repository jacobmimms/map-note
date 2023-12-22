'use client'
import { useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

export default function LocateMe() {
    const map = useMap();

    function locateUser() {
        map.locate({
            setView: true,
            maxZoom: map.getZoom(),
        });

    }


    return (
        <div className='fixed bottom-4 left-4'>
            <button onClick={locateUser} className='bg-slate-700 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center '>
                <FontAwesomeIcon icon={faLocation} className='w-6 h-6' />
            </button>
        </div >

    );
};

