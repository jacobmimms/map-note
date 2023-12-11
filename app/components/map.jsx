'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import useGeolocation from "react-hook-geolocation";
import Loading from './loading'

function RecenterAutomatically() {
    const map = useMap();
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                console.log(latitude, longitude)
                map.setView([latitude, longitude]);
            })
        }
    }, []);
    return null;
}

function LocationMarker({ position }) {
    useEffect(() => {
    }, [position]);

    const icon_ = L.icon({
        iconUrl: './next.svg',
        iconSize: [50, 50],

    });
    return (<Marker position={position} icon={icon_} ></Marker>
    )

}
export default function Page() {
    const [position, setPosition] = useState(null);
    const geolocation = useGeolocation();
    useEffect(() => {
        if (!geolocation.latitude) return;
        setPosition([geolocation.latitude, geolocation.longitude]);
    }, [geolocation]);

    if (!position) return (
        <div className=' flex items-center justify-center w-[100vw] h-[80vh] bg-slate-700'>   <Loading /></div>
    );
    console.log(position)
    return (
        <>
            <MapContainer className={'w-[100vw] h-[80vh]'} center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterAutomatically />
                <LocationMarker position={position} />
            </MapContainer>
        </>
    );
}
