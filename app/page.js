'use client';
import { useState, useEffect } from 'react';
import Upload from './components/upload';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./components/map'), {
  ssr: false, // This ensures no server-side rendering for this component
});


const Page = () => {
  return (
    <>
      <main className='h-[80vh] flex items-center justify-center'>
        <DynamicMap />
      </main>
      <section className='h-[20vh] flex items-center justify-center'>
        <Upload className='fixed bottom-0' />
      </section>
    </>
  );
};

export default Page;
