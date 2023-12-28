'use client'
import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import LocationMarker from './locationMarker'
import LocateMe from './locateMe'


function Map() {
    console.log("rendering map")
    const mapRef = useRef(null);
    const savedLocation = localStorage.getItem('lastLocation');
    const [position, setPosition] = useState(
        savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 }
    );

    const params = useSearchParams();
    const latitude = params.get('latitude');
    const longitude = params.get('longitude');


    const handleReady = (e) => {
        console.log("map ready")
        mapRef.current = e.target;

        if (latitude && longitude) {
            console.log("setting view", latitude, longitude)
            mapRef.current.setView([latitude, longitude], 14);
            return;
        }

        e.target.locate(
            {
                setView: false,
                watch: false,
                maxZoom: 14,
                enableHighAccuracy: true
            }
        );
        e.target.once('locationfound', (e) => {
            if (!latitude && !longitude) {
                mapRef.current.setView(e.latlng, 14);
            }
            setPosition({ latitude: e.latitude, longitude: e.longitude });
            localStorage.setItem('lastLocation', JSON.stringify({ latitude: e.latitude, longitude: e.longitude }));
        });
        e.target.on('locationerror', (e) => {
            console.error('error in handle ready', e);
        });
    }

    if (mapRef.current !== null && location.latitude == 0 && location.longitude == 0) {
        return <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>;
    }


    return (
        <MapContainer ref={mapRef} className={`h-full w-full`} center={[position.latitude, position.longitude]} zoom={14} zoomControl={false} scrollWheelZoom={false} tap={false} whenReady={handleReady}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateMe position={position} />
            <LocationMarker />
            <Markers />
        </MapContainer>
    );
}


export default Map;

