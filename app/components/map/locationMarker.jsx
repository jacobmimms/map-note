'use client'
import { Marker } from 'react-leaflet'
import { useMemo } from 'react';
import { useLocationAndPosts } from '../../providers/locationAndPosts';

export default function LocationMarker() {
    const { location } = useLocationAndPosts();
    const icon = useMemo(() => L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    }), []);

    return (
        <>
            <Marker position={[location.latitude, location.longitude]} icon={icon} zIndexOffset={100} >
            </Marker>
        </>


    )
}
