'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import Loading from '../animations/loading'
import Markers from './markers'
import { useMap } from 'react-leaflet';
import { useLocation } from '../../hooks/location'
import LocationMarker from './locationMarker'
import LocateMe from './locateMe'

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
    const position = useLocation();
    const [mapData, setMapData] = useState()

    if (!position) return (
        <div className={`flex items-center justify-center w-full h-full  bg-slate-600`}>  <Loading /></div>
    );


    return (
        <MapContainer className={`h-full w-full`} center={[0, 0]} zoom={15} zoomControl={false} scrollWheelZoom={false} tap={false} whenReady={(event) => setMapData(event.target)}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocateMe zIndex={10} />
            <LocationMarker position={position} />
            <MapUpdater position={position} />
            <Markers />
        </MapContainer>
    );
}


export default Map;

