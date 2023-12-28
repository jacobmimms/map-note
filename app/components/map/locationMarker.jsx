'use client'
import { Marker } from 'react-leaflet'
import { useMemo, useEffect } from 'react';
import usePosition from './useMapPosition';

export default function LocationMarker() {
    const [position, setPosition] = usePosition();

    useEffect(() => {
        const id = navigator.geolocation.watchPosition((pos) => {
            setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        }, (err) => {
            console.log(err);
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 20000 });
        return () => {
            navigator.geolocation.clearWatch(id);
        }
    }, []);

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
