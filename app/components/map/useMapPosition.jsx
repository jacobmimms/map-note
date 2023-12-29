'use client'
import { useMap } from 'react-leaflet';
import { useState } from 'react';

export default function useMapPosition() {
    const savedLocation = localStorage.getItem('lastLocation');
    const [position, setPosition] = useState(
        savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 }
    );
    const map = useMap();

    map.once(
        'locationfound',
        (e) => {
            console.log("moving it arrggh")
            setPosition({ latitude: e.latitude, longitude: e.longitude });
        }
    );
    return [position, setPosition];
}