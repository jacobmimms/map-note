'use client';
import { useState, useEffect } from 'react';
import Upload from './components/upload';
import dynamic from 'next/dynamic';
import Loading from './components/loading';
// import useGeolocation from "react-hook-geolocation";

const DynamicMap = dynamic(() => import('./components/map'), {
  ssr: false, // This ensures no server-side rendering for this component
});


const Page = () => {
  return (
    <>
      <main className='h-[80vh] flex items-center justify-center'>
        <DynamicMap />
      </main>
      <Upload className='fixed bottom-0' />
    </>
  );
};

export default Page;
