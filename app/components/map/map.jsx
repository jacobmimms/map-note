'use client'
import { useState, useRef } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import LocationMarker from './locationMarker'
import LocateMe from './locateMe'


function Map() {
    const mapRef = useRef(null);
    const savedLocation = localStorage.getItem('lastLocation');
    const positionRef = useRef(
        savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 }
    );

    if (positionRef.current.latitude === 0 && positionRef.current.longitude === 0) {
        return <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>;
    }

    const handleReady = (e) => {
        mapRef.current = e.target;
        e.target.locate(
            {
                setView: true,
                maxZoom: 14,
                watch: true,
                enableHighAccuracy: true
            }
        );
        e.target.on('locationfound', (e) => {
            localStorage.setItem('lastLocation', JSON.stringify({ latitude: e.latitude, longitude: e.longitude }));
        });
    }


    return (
        <MapContainer className={`h-full w-full`} center={[positionRef.current.latitude, positionRef.current.longitude]} zoom={14} zoomControl={false} scrollWheelZoom={false} tap={false} whenReady={handleReady}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateMe />
            <LocationMarker />
            <Markers />
        </MapContainer>
    );
}


export default Map;

