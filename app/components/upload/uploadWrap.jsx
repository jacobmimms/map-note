'use client'
import { useEffect, useState, useMemo } from 'react'
// import { useLocation } from '../../hooks/location';
import UploadBase from './uploadBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LocationProvider } from '../../hooks/location';

function DeleteButton() {
    async function deleteALL() {
        const delete_all = true;
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ delete_all }),
        });
        const rows = await response.json();
        return rows;
    }
    return (
        <button onClick={() => {
            if (window.confirm('Are you sure you want to delete all posts?')) {
                deleteALL();
            }
        }}>
            DELETE ALL
        </button>
    )
}

export default function UploadWrap() {
    const [shelfOpen, setShelfOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    // const location = useLocation();

    const [uploadData, setUploadData] = useState({
        file: null,
        text: ''
    });

    useEffect(() => {
        if (success) {
            setUploadData({
                file: null,
                text: ''
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
    const shelfClass = shelfOpen ? 'w-full fixed' : 'w-16 hidden';

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

            <div className={`${shelfClass} bg-transparent bottom-0 right-0 rounded-lg shadow-md w-full`}>
                {/* <DeleteButton /> */}
                <LocationProvider>
                    <UploadBase uploadData={uploadData} setUploadData={setUploadData} toggleShelf={toggleShelf} setFailure={setFailure} setSuccess={setSuccess} />
                </LocationProvider>
            </div>

            <div className={`fixed bottom-0 right-0 `}>
                <button onClick={toggleShelf} className="bg-slate-700 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center absolute bottom-4 right-4 z-10">
                    <FontAwesomeIcon icon={buttonIcon} className="h-6 w-6" />
                </button>
            </div>

        </div>
    )
}   