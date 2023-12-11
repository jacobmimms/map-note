'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'


const useUserPosition = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    const onSuccess = ({ coords }) => {
        const { latitude, longitude } = coords;
        setPosition([latitude, longitude]);
    };

    const onError = (err) => {
        setError(err.message);
    };

    useEffect(() => {
        let isMounted = true;
        let watchId;

        if ('geolocation' in navigator) {
            const geo = navigator.geolocation;
            watchId = geo.watchPosition(onSuccess, onError);
        } else {
            setError('Geolocation is not supported');
        }

        return () => {
            isMounted = false;
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    return { position, error };
};

function RecenterAutomatically() {
    const { position, error } = useUserPosition();
    console.log(position, error)
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
function LocationMarker() {
    const { position, error } = useUserPosition();
    const map = useMap();

    useEffect(() => {
    }, [position]);

    const icon_ = L.icon({
        iconUrl: './next.svg',
        iconSize: [50, 50],

    });
    return position === null ? (
        <div>Getting Location...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <Marker position={position} icon={icon_} ></Marker>
    )

}
export default function Page() {
    const { position, error } = useUserPosition();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoading(false);
        }
    }, []);



    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while window object is undefined
    }
    const icon_ = L.icon({
        iconUrl: './next.svg',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],

    });



    return (
        <MapContainer className={'w-[100vw] h-[80vh]'} center={[0, 0]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterAutomatically />
            <LocationMarker />
        </MapContainer>
    );
}
