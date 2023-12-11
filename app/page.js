'use client';
import { useState, useEffect } from 'react';
import Upload from './components/upload';
import dynamic from 'next/dynamic';
import Loading from './components/loading';

const useUserPosition = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  const onSuccess = ({ coords }) => {
    const { latitude, longitude } = coords;
    setPosition([latitude, longitude]);
  };

  const onError = (err) => {
    setError(err.message);
  };

  useEffect(() => {
    let isMounted = true;
    let watchId;

    const getUserLocation = () => {
      if (isMounted && 'geolocation' in navigator) {
        const geo = navigator.geolocation;
        watchId = geo.watchPosition(onSuccess, onError);
      } else {
        setError('Geolocation is not supported');
      }
    };

    const checkNavigator = () => {
      if (window && 'navigator' in window) {
        clearInterval(checkInterval);
        getUserLocation();
      }
    };

    let checkInterval = setInterval(checkNavigator, 1000); // Check every second

    return () => {
      isMounted = false;
      clearInterval(checkInterval);
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return { position, error };
};


const DynamicMap = dynamic(() => import('./components/map'), {
  ssr: false, // This ensures no server-side rendering for this component
});

const Page = () => {
  const { position, error } = useUserPosition();

  return (
    <>
      <main className='h-[80vh] flex items-center justify-center'>
        {position ?
          <DynamicMap position={position} /> :
          <div className='flex items-center justify-center w-full h-full bg-slate-500'>
            <Loading />
          </div>
        }
      </main>
      <Upload className='fixed bottom-0' />
    </>
  );
};

export default Page;
