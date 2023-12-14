'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import useGeolocation from "react-hook-geolocation"
import Loading from './loading'
import Markers from './markers'


function LocationMarker() {
    const [position, setPosition] = useState(null);
    const geolocation = useGeolocation();

    useEffect(() => {
        if (!geolocation.latitude) return;
        setPosition([geolocation.latitude, geolocation.longitude]);
    }, [geolocation]);
    // useEffect(() => {
    // }, [position]);

    const icon_ = L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],

    });
    if (!position) return null;
    return (<Marker position={position} icon={icon_} ></Marker>
    )
}

export default function Page() {
    const [position, setPosition] = useState(null);
    const geolocation = useGeolocation();

    useEffect(() => {
        if (!geolocation.latitude) return;

        const newPosition = [geolocation.latitude, geolocation.longitude];

        // Only update position if the change is significant (e.g., more than 0.001 degrees)
        if (!position || Math.abs(newPosition[0] - position[0]) > 0.001 || Math.abs(newPosition[1] - position[1]) > 0.001) {
            setPosition(newPosition);
        }
    }, [geolocation, position]);

    if (!position) return (
        <div className={`flex items-center justify-center w-full h-full  bg-slate-700`}>  <Loading /></div>
    );

    return (
        <>
            <MapContainer className={`h-full w-full`} center={position} zoom={20} scrollWheelZoom={false} tap={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker/>
                <Markers />
            </MapContainer>
        </>
    );
}
