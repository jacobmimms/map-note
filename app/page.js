'use client'
import { useState, useEffect } from 'react';
import Upload from './components/upload';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./components/map'), {
  ssr: false, // This ensures no server-side rendering for this component
});

const Page = () => {
  const [windowExists, setWindowExists] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowExists(true);
    }
  }, []);

  return (

    <>
      <main className='w-full h-full min-h-full'>
        <DynamicMap />
        <Upload />
      </main>
    </>
  );
};

export default Page;