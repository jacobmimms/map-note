'use client'
import { Marker, CircleMarker } from 'react-leaflet'
import { useMemo, useState, useEffect, useRef } from 'react';

export default function LocationMarker() {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const circleRef = useRef(null);
    function pulseCircle() {
        console.log('pulse');
        setInterval(() => {
            setRadius((oldRadius) => (oldRadius === 10 ? 15 : 10));
        }, 1000);
    }

    useEffect(() => {

        const id = navigator.geolocation.watchPosition((pos) => {
            setPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        }, (err) => {
            console.log(err);
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 20000 });
        return () => {
            navigator.geolocation.clearWatch(id);
        }
    }, []);

    useEffect(() => {
        let rad = 3
        const intervalId = setInterval(() => {
            if (circleRef.current == null) {
                return;
            }
            let range = 10
            let space = 55
            for (let i = 0; i < range; i++) {
                setTimeout(() => {
                    circleRef.current.setRadius(rad + i)
                }, space * i);
            }
            for (let i = range; i > 0; i--) {
                setTimeout(() => {
                    circleRef.current.setRadius(rad + i)
                }, space * (range - i) + space * range);
            }
        },
            Math.floor(Math.random() * 2000) + 4000
        );

        return () => clearInterval(intervalId);
    }, []);




    const icon = useMemo(() => L.icon({
        iconUrl: './location.png',
        iconSize: [15, 15],
    }), []);

    console.log("hi")

    return (
        <>
            <CircleMarker ref={circleRef} center={[position.latitude, position.longitude]} radius={5}>
            </CircleMarker>
            <Marker position={[position.latitude, position.longitude]} icon={icon} >
            </Marker>
        </>


    )
}
