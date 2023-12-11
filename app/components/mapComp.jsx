'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'


const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                map.setView([latitude, longitude]);
            })
        }
    }, []);

    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

function MapComponent() {
    return (
        <MapContainer className={'w-[100vw] h-[80vh]'} center={location} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}></Marker>
            <RecenterAutomatically lat={location[0]} lng={location[1]} />
        </MapContainer>
    )
}

export default MapComponent