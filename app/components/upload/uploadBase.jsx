'use client'
import React, { useState, useCallback, useContext, useRef } from "react";
import Loading from '../animations/loading';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { LocationContext } from '@/app/providers/locationProvider';

async function updateSqlDatabase(location, text, id, setSuccess, setFailure) {
    const { latitude, longitude } = location;
    const content = text;
    const title = id;
    const post = { content, latitude, longitude, title };
    let postResponse;
    try {
        postResponse = await fetch('/api/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            }
        );
    } catch (error) {
        console.error("error uploading to postgres", error);
    }

    if (postResponse?.ok && !postResponse.redirected) {
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

async function getSignedUrl(uploadData) {
    const id = `${Date.now()}${uploadData.file.name}`;
    const response = await fetch('/api/upload',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename: id, contentType: uploadData.file.type }),
        }
    )
    return response;
}

async function uploadFile(response, uploadData) {
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
    return uploadResponse;
}


export default function UploadBase({ uploadData, setUploadData, toggleShelf, setFailure, setSuccess }) {
    const [uploading, setUploading] = useState(false)
    const location = useContext(LocationContext);
    let isMobile = useRef(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (!uploadData.file) {
            alert('Please select a file to upload.')
            return
        }
        try {
            setUploading(true)
            const response = await getSignedUrl(uploadData)
            if (response.ok) {
                const uploadResponse = await uploadFile(response, uploadData)
                if (uploadResponse.ok) {
                    updateSqlDatabase(location, uploadData.text, id, setSuccess, setFailure);
                } else {
                    console.error('S3 Upload Error:', uploadResponse)
                    setFailure(true)
                    setUploading(false)
                }
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


    return (
        <div className="flex flex-col justify-between items-start pb-5">
            <ImagePreview file={uploadData.file} />
            <form className='w-full px-4' onSubmit={handleSubmit}>

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

                <div className="px-20 w-full flex flex-row justify-around">
                    <label className='rounded-md px-4 py-2 hover:cursor-pointer bg-slate-800 hover:shadow-md ' htmlFor="file">
                        <FontAwesomeIcon icon={faFile} className="h-6 w-6" />
                    </label>

                    {isMobile.current &&
                        <label className='rounded-md  px-4 py-2 hover:cursor-pointer bg-slate-800 hover:shadow-md ' htmlFor="camera-pic">
                            <FontAwesomeIcon icon={faCamera} className="h-6 w-6" />
                        </label>
                    }

                    <button className='block rounded-md hover:cursor-pointer min-w-fit px-4 py-2 bg-slate-800 text-slate-300' type="submit" disabled={uploading}>
                        {
                            !uploading ?
                                <FontAwesomeIcon icon={faUpload} className="h-6 w-6" /> :
                                <Loading />

                        }
                    </button>
                </div>

            </form>

        </div>
    )
}