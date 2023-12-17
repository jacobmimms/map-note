'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import { useMap } from 'react-leaflet';
import { useLocation } from '../../hooks/location'
import LocationMarker from './locationMarker'

function MapUpdater({ position }) {
    const map = useMap();
    const [hasFlown, setHasFlown] = useState(false);

    useEffect(() => {
        if (!hasFlown) {
            map.flyTo([position.latitude, position.longitude], map.getZoom(), {
                duration: 1,
            });
            setHasFlown(true);
        }
    }, [position, map, hasFlown, setHasFlown]);

    return null;
}


function Map() {
    let position = useLocation();
    if (!position) return (
        <div className={`flex items-center justify-center w-full h-full  bg-slate-700`}>  <Loading /></div>
    );

    return (
        <MapContainer className={`h-full w-full`} center={[0, 0]} zoom={15} scrollWheelZoom={false} tap={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} />
            <MapUpdater position={position} />
            <Markers />
        </MapContainer>
    );
}


export default Map;

