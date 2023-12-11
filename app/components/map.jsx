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
export default function Page({ position }) {
    return (
        <MapContainer className={'w-[100vw] h-[80vh]'} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterAutomatically />
            <LocationMarker position={position} />
        </MapContainer>
    );
}
