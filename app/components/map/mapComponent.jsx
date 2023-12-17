'use client'
import { LocationProvider } from '../../hooks/location';
import Map from './map';


function MapComponent() {
    return (
        <LocationProvider>
            <Map />
        </LocationProvider>
    );
}

export default MapComponent;