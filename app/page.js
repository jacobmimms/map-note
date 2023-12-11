'use client'
import { useState, useEffect } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import Upload from './components/upload'
import Map from './components/map'

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        map.setView([latitude, longitude]);
      })
    }
  }, []);

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);


  return null;
}

export default function Page() {

  const [location, setLocation] = useState([0, 0])
  return (
    <>
      <main className='w-full h-full min-h-full'>
        <Map />
        <Upload />
      </main>

    </>

  )
}