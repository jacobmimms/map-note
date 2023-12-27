'use client'
import { useEffect, useState, useMemo } from 'react'
import UploadBase from './uploadBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function UploadComponent() {
    const [shelfOpen, setShelfOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [uploadData, setUploadData] = useState({
        file: null,
        text: '',
    });


    useEffect(() => {
        if (success) {
            setUploadData({
                file: null,
                text: '',
            });
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
        if (failure) {
            setTimeout(() => {
                setFailure(false);
            }, 3000);
        }
    }, [failure, success, shelfOpen]);


    const toggleShelf = () => {
        setShelfOpen(!shelfOpen);
    };


    const buttonIcon = shelfOpen ? faTimes : faPlus;
    const shelfClass = shelfOpen ? 'translate-y-0' : 'translate-y-full';

    return (
        <div className='select-none w-full'>

            {success && (
                <div className="fixed bottom-0 left-0 py-4 z-10 w-full px-20">
                    <div className="bg-green-500 rounded-md shadow-md p-4">
                        <p className="text-white text-center">Upload successful!</p>
                    </div>
                </div>
            )}
            {failure && (
                <div className="fixed bottom-0 left-0 py-4 z-10 w-full px-20">
                    <div className="bg-red-500 rounded-md shadow-md p-4">
                        <p className="text-white text-center">Upload failed!</p>
                    </div>
                </div>
            )}

            <div className={`fixed ${shelfClass} bg-transparent bottom-0 right-0 rounded-lg shadow-md w-full transition-transform duration-300`}>
                <UploadBase uploadData={uploadData} setUploadData={setUploadData} toggleShelf={toggleShelf} setFailure={setFailure} setSuccess={setSuccess} />
            </div>

            <div className={`fixed bottom-0 right-0 `}>
                <button onClick={toggleShelf} className="bg-slate-800 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center absolute bottom-4 right-4 z-10">
                    <FontAwesomeIcon icon={buttonIcon} className="h-6 w-6" />
                </button>
            </div>

        </div>
    )
}   