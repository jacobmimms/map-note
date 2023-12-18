'use client'
import dynamic from 'next/dynamic';
import UploadComponent from '../components/upload/uploadComponent';
import { useState } from 'react';

const DynamicMap = dynamic(() => import('../components/map/mapComponent'), {
    ssr: false, // This ensures no server-side rendering for this component
});


function Page() {
    const [mapData, setMapData] = useState(null);
    const [marker, setMarker] = useState(null);
    return (
        <main className='h-full flex items-center justify-center overflow-hidden' style={{ position: 'relative' }}>
            <DynamicMap />
            <UploadComponent />
        </main>
    );
};

export default Page;
