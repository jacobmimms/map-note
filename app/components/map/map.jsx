'use client'
import { useState, useRef, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import LocationMarker from './locationMarker'
import LocateMe from './locateMe'


function Map() {
    const mapRef = useRef(null);
    const savedLocation = localStorage.getItem('lastLocation');
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(
        savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 }
    );



    const handleReady = (e) => {
        console.log('map ready');
        mapRef.current = e.target;
        e.target.locate(
            {
                setView: true,
                maxZoom: 14,
                enableHighAccuracy: true
            }
        );
        e.target.on('locationfound', (e) => {
            setPosition({ latitude: e.latitude, longitude: e.longitude });
            localStorage.setItem('lastLocation', JSON.stringify({ latitude: e.latitude, longitude: e.longitude }));
        });
        e.target.on('locationerror', (e) => {
            console.log(e);
        });
        setLoading(false);
    }

    if (loading && mapRef.current !== null) {
        return <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>;
    }

    return (
        <MapContainer ref={mapRef} className={`h-full w-full`} center={[position.latitude, position.longitude]} zoom={14} zoomControl={false} scrollWheelZoom={false} tap={false} whenReady={handleReady}>
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

