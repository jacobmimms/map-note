'use client'
import dynamic from 'next/dynamic';
import UploadComponent from '../components/upload/uploadComponent';
import { useState } from 'react';

const DynamicMap = dynamic(() => import('../components/map/mapComponent'), {
    ssr: false, // This ensures no server-side rendering for this component
});


function ExplorePage() {
    return (
        <section className='h-full relative items-center justify-center overflow-hidden'>
            <DynamicMap />
            <UploadComponent />
        </section>
    );
};

export default ExplorePage;
