import dynamic from 'next/dynamic';
import UploadComponent from '../components/upload/uploadComponent';

const DynamicMap = dynamic(() => import('../components/map/mapComponent'), {
    ssr: false, // This ensures no server-side rendering for this component
});

const Page = () => {
    return (
        <main className='h-full flex items-center justify-center overflow-hidden' style={{ position: 'relative' }}>
            <DynamicMap />
            <UploadComponent />
        </main>
    );
};

export default Page;
