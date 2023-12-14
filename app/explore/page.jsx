'use client'
import { useState } from 'react';
import Upload from '../components/upload';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../components/map'), {
    ssr: false, // This ensures no server-side rendering for this component
});

const Page = () => {
    const [shelfOpen, setShelfOpen] = useState(false);

    const toggleShelf = () => {
        setShelfOpen(!shelfOpen);
    };

    return (
        <>
            <main className='h-full flex items-center justify-center overflow-hidden' style={{ position: 'relative' }}>
                <DynamicMap/>
                <div className={`fixed bottom-0 right-0 p-4 z-10 ${shelfOpen ? 'w-full' : 'w-16'}`}>
                    {shelfOpen && (
                        <div className="bg-slate-400 rounded-lg shadow-md">
                            <Upload />
                        </div>
                    )}
                    <button onClick={toggleShelf} className="bg-slate-700 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center absolute bottom-4 right-4" style={{ zIndex: 101 }}>
                        {shelfOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        )}
                    </button>
                </div>
            </main>
        </>
    );
};

export default Page;
