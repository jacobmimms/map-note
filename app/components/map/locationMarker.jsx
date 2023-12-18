'use client'
import { Marker } from 'react-leaflet'
import { useMemo } from 'react';

export default function LocationMarker({ position }) {
    const icon = useMemo(() => L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    }), []);

    if (!position) return null;

    return (<Marker position={[position.latitude, position.longitude]} icon={icon} ></Marker>
    )
}
