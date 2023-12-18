'use client'
import { LocationProvider } from '../../hooks/location';
import UploadWrap from './uploadWrap';
import { SessionProvider } from 'next-auth/react';

function UploadComponent() {
    return (
        <SessionProvider >
            <LocationProvider>
                <UploadWrap />
            </LocationProvider>
        </SessionProvider>
    );
}

export default UploadComponent;