'use client'
import { useEffect, useState } from 'react'
import { useLocation } from '../../hooks/location';
import UploadBase from './uploadBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function DeleteButton() {
    async function deleteALL() {
        // make a request to the api to delete all posts
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
        <button onClick={deleteALL}>
            DELETE ALL
        </button>
    )
}

export default function UploadWrap() {
    const [shelfOpen, setShelfOpen] = useState(false);
    const [uploading, setUploading] = useState(false)
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const [uploadData, setUploadData] = useState({
        file: null,
        text: ''
    });

    useEffect(() => {
        if (success) {
            // setUploadData({
            //     file: null,
            //     text: ''
            // });
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
        if (failure) {
            setTimeout(() => {
                setFailure(false);
            }, 3000);
        }
    }, [failure, success]);


    const toggleShelf = () => {
        setShelfOpen(!shelfOpen);
    };

    return (
        <>
            {success && (
                <div className="fixed bottom-0 left-0 p-4 z-10 w-full">
                    <div className="bg-green-500 rounded-lg shadow-md">
                        <p className="text-white text-center">Upload successful!</p>
                    </div>
                </div>
            )}
            {failure && (
                <div className="fixed bottom-0 left-0 p-4 z-10 w-full">
                    <div className="bg-red-500 rounded-lg shadow-md">
                        <p className="text-white text-center">Upload failed!</p>
                    </div>
                </div>
            )}
            <div className={`fixed bottom-0 right-0 p-4 z-10 ${shelfOpen ? 'w-full' : 'w-16'}`}>
                {shelfOpen && (
                    <div className="bg-slate-400 rounded-lg shadow-md">
                        <DeleteButton />
                        <UploadBase location={location} uploadData={uploadData} setUploadData={setUploadData} toggleShelf={toggleShelf} setFailure={setFailure} setSuccess={setSuccess} />
                    </div>
                )}


                <button onClick={toggleShelf} className="bg-slate-700 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center absolute bottom-4 right-4" style={{ zIndex: 101 }}>
                    {shelfOpen ? (
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    ) : (
                        <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                    )}
                </button>
            </div>
        </>
    )
}   