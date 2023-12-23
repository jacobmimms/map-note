'use client'
import { useState, useEffect, useRef } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import { useMap } from 'react-leaflet';
import { useLocation } from '../../hooks/location'
import LocationMarker from './locationMarker'
import LocateMe from './locateMe'


function Map() {
    const userLocation = useLocation();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const mapRef = useRef(null);

    useEffect(() => {
        if (userLocation) {
            setPosition(userLocation);
            localStorage.setItem('lastLocation', JSON.stringify(userLocation));
        } else {
            const savedLocation = localStorage.getItem('lastLocation');
            const location = savedLocation ? JSON.parse(savedLocation) : { latitude: 0, longitude: 0 };
            setPosition(location);
        }
    }, [userLocation]);

    if (!userLocation && position.latitude === 0 && position.longitude === 0) {
        return <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>;
    }

    // console.log('position', position)

    // const handleMapCreate = (map) => {
    //     console.log('map created');
    //     mapRef.current = map;
    //     map.locate(
    //         {
    //             setView: true,
    //             maxZoom: 14,
    //             watch: true,
    //             enableHighAccuracy: true
    //         }
    //     );
    // }

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
    }

    return (
        <MapContainer className={`h-full w-full`} center={[position.latitude, position.longitude]} zoom={15} zoomControl={false} scrollWheelZoom={false} tap={false} whenReady={handleReady}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateMe />
            <LocationMarker position={position} />
            <Markers />
        </MapContainer>
    );
}


export default Map;

