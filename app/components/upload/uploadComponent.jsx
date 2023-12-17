'use client'
import { LocationProvider } from '../../hooks/location';
import UploadWrap from './uploadWrap';

function UploadComponent() {
    return (
        <LocationProvider>
            <UploadWrap />
        </LocationProvider>
    );
}

export default UploadComponent;