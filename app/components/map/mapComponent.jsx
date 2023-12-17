'use client'
import { LocationProvider } from '../../hooks/location';
import Map from './map';
import { memo } from 'react'


function MapComponent() {
    return (
        <LocationProvider>
            <Map />
        </LocationProvider>
    );
}

export default MapComponent;