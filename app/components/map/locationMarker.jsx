'use client'
import { Marker } from 'react-leaflet'
import { useMemo, useContext } from 'react';
import { LocationContext } from '@/app/providers/locationProvider';

export default function LocationMarker() {
    const position = useContext(LocationContext);
    const icon = useMemo(() => L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    }), []);

    return (
        <>
            <Marker position={[position.latitude, position.longitude]} icon={icon} zIndexOffset={100} >
            </Marker>
        </>


    )
}
