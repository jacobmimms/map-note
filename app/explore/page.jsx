'use client'
import dynamic from 'next/dynamic';
import UploadComponent from '../components/upload/uploadComponent';

const DynamicMap = dynamic(() => import('../components/map/mapComponent'), {
    ssr: false,
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
