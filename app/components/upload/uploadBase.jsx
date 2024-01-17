'use client'
import React, { useState, useCallback } from "react";
import Loading from '../animations/loading';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useLocationAndPosts } from "@/app/providers/locationAndPosts";

async function updateSqlDatabase(location, text, id, setSuccess, setFailure) {
    const { latitude, longitude } = location;
    const content = text;
    const title = id;
    const post = { content, latitude, longitude, title };
    let postResponse;
    try {
        postResponse = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
    } catch (error) {
        console.error(error);
    }
    if (postResponse?.ok) {
        if (postResponse.redirected) {
            setFailure(true);
            return;
        }
        setSuccess(true);
    } else {
        console.error('Post upload error:', postResponse);
        setFailure(true);
    }
}

const ImagePreview = React.memo(
    function ImagePreview({ file }) {
        if (!file) return null;
        return (
            <div className='relative md:h-[200px] md:w-[200px] h-[150px] w-[150px] flex flex-row items-center justify-left bg-transparent p-2 mx-4 rounded-lg'>
                <Image fill src={URL.createObjectURL(file)} alt="preview image" className="rounded-md object-cover " />
            </div>
        );
    }
);


export default function UploadBase({ uploadData, setUploadData, toggleShelf, setFailure, setSuccess }) {
    const [uploading, setUploading] = useState(false)
    const { location } = useLocationAndPosts();
    const [toggle, setToggle] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (!uploadData.file) {
            showPopup()
            return
        }
        if (location.latitude == null || location.longitude == null) {
            alert('Please enable location services to upload.')
            return
        }
        try {
            const id = `${Date.now()}${uploadData.file.name}`;
            setUploading(true)
            const response = await fetch('/api/upload',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filename: id, contentType: uploadData.file.type }),
                }
            )
            if (response.ok) {
                const { url, fields } = await response.json()
                const formData = new FormData()
                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                formData.delete('file')
                formData.append('file', uploadData.file)

                const uploadResponse = await fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                if (!uploadResponse.ok) {
                    console.error('S3 Upload Error:', uploadResponse)
                    setFailure(true)
                }

                updateSqlDatabase(location, uploadData.text, id, setSuccess, setFailure);

            } else {
                alert('Failed to get pre-signed URL.')
            }
        } catch (error) {
            console.error(error)
            setFailure(true)
        }
        setUploading(false)
        toggleShelf()
    }, [uploadData, location, setFailure, setSuccess]);

    const setFile = useCallback((e) => {
        const files = e.target.files
        if (files && files[0]) {
            if (files[0].size > 5000000) {
                alert('File size too large. Please select a file smaller than 5MB.')
                return
            }
            setUploadData({ ...uploadData, file: files[0] })
        }
    }, [uploadData, setUploadData]);


    const dropdownClass = toggle ? 'translate-y-0 scale-100' : 'translate-y-[300%] scale-0';


    const showPopup = () => {
        setToggle(true);

        setTimeout(
            () => {
                setToggle(false);
            }
            , 2000);
    }


    return (
        <div className="flex flex-col justify-between items-start pb-[18px]">
            <div className={`${dropdownClass} fixed transition-transform duration-300  w-[80%] -top-20 bg-red-500 h-20 inset-x-0 mx-auto rounded-lg`}>
                <div className="flex flex-row justify-center items-center h-full">
                    <p className="text-white text-center">Please select a file to upload.</p>
                </div>
            </div>
            <ImagePreview file={uploadData.file} />
            <form className='flex flex-col items-center justify-center w-full px-4' onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-left w-full h-full p-1">
                    <input
                        className='hidden'
                        id="file"
                        type="file"
                        onChange={setFile}
                        accept="image/png, image/jpeg"
                    />
                    <input id='camera-pic' type="file" accept="image/*" capture="camera" className="hidden" onChange={setFile}></input>
                </div>

                <textarea
                    className='h-full w-full rounded-lg p-2 bg-slate-800 '
                    type='text'
                    id='content'
                    placeholder='Write your thoughts here!'
                    rows={2}
                    onChange={
                        (e) => {
                            setUploadData({ ...uploadData, text: e.target.value })
                        }
                    }
                    value={uploadData.text}
                >
                </textarea>

                <div className="pt-2 w-full px-16 sm:w-[50%] xl:w-[30%] flex flex-row justify-center gap-2">
                    <label className='block rounded-md w-full p-2 hover:cursor-pointer bg-slate-800 hover:bg-slate-600  hover:active:bg-slate-700 hover:text-white' htmlFor="camera-pic">
                        <FontAwesomeIcon icon={faCamera} className="h-6 w-full" />
                    </label>

                    <button className='block rounded-md hover:cursor-pointer w-full p-2 bg-slate-800 hover:bg-slate-600 hover:active:bg-slate-700 hover:text-white' type="submit" disabled={uploading}>
                        {
                            !uploading ?
                                <FontAwesomeIcon icon={faUpload} className="h-6 w-full" /> :
                                <Loading className={'h-6 w-full'} />
                        }
                    </button>
                </div>

            </form>

        </div>
    )
}