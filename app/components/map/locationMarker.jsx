'use client'
import { Marker } from 'react-leaflet'
import { useMemo, useState, useEffect } from 'react';
import { useMap } from 'react-leaflet'

export default function LocationMarker() {
    const map = useMap();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        map.locate({
            watch: true,
            setView: false,
            maxZoom: 15,
            enableHighAccuracy: true
        });
        map.on('locationfound', (e) => {
            setPosition({ latitude: e.latitude, longitude: e.longitude });
        });

        return () => {
            map.stopLocate();
        };
    }, []);

    const icon = useMemo(() => L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    }), []);

    return (<Marker position={[position.latitude, position.longitude]} icon={icon} ></Marker>
    )
}
