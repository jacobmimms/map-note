'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import useGeolocation from "react-hook-geolocation"
import Loading from './loading'
import Image from 'next/image'
import Markers from './markers'

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
        iconUrl: './location.png',
        iconSize: [15, 15],

    });
    return (<Marker position={position} icon={icon_} ></Marker>
    )
}

export default function Page() {
    const [position, setPosition] = useState(null);
    const geolocation = useGeolocation();
    useEffect(() => {
        if (!geolocation.latitude) return;
        setPosition([geolocation.latitude, geolocation.longitude]);
    }, [geolocation]);

    if (!position) return (
        <div className=' flex items-center justify-center w-[100vw] h-[80vh] bg-slate-700'>   <Loading /></div>
    );

    // function Markers() {
    //     const icon_ = L.icon({
    //         iconUrl: './marker.png',
    //         iconSize: [40, 40],

    //     });
    //     const [posts, setPosts] = useState([])
    //     useEffect(() => {
    //         async function getPosts() {
    //             let res = await fetch('/api/posts', { method: 'GET' })
    //             let data = await res.json()
    //             setPosts(data)
    //         }
    //         getPosts()
    //     }, [])
    //     const url = 'https://mimms-pictures.s3.amazonaws.com/'
    //     function encodeS3Key(key) {
    //         try {
    //             // Encode the key and replace spaces with '+'
    //             const encodedKey = encodeURIComponent(key).replace(/%20/g, '+');
    //             return encodedKey;
    //         } catch (error) {
    //             console.error('Error encoding S3 key:', error);
    //             return null;
    //         }
    //     }
    //     return (
    //         <>
    //             {posts.map((post) => {
    //                 return (
    //                     <Marker key={post.id} position={[post.latitude, post.longitude]} icon={icon_}>
    //                         <Popup position={[post.latitude, post.longitude]}>
    //                             <div className='flex flex-col'>
    //                                 <Image src={`${url}${encodeS3Key(post.id)}`} width={100} height={100} alt='pop up image' />
    //                                 <span>{post.description}</span>
    //                             </div>
    //                         </Popup>
    //                     </Marker>
    //                 )
    //             })}
    //         </>
    //     )
    // }

    return (
        <>
            <MapContainer className={'w-[100vw] h-[80vh]'} center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterAutomatically />
                <LocationMarker position={position} />
                <Markers />
            </MapContainer>
        </>
    );
}
