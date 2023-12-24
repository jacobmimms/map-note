'use client'
import { useState, useEffect } from "react";
import Loading from '../animations/loading';
import { useLocation } from '../../hooks/location';
import Image from 'next/image';

async function updateSqlDatabase(location, text, id, setSuccess, setFailure) {
    const { latitude, longitude } = location;
    const content = text;
    const title = id;
    const post = { content, latitude, longitude, title };
    const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });

    if (postResponse.ok) {
        if (postResponse.redirected) {
            console.log('Redirected to login page.');
            setFailure(true);
            return;
        }
        console.log('Post uploaded to database.');
        setSuccess(true);
    } else {
        console.error('Post upload error:', postResponse);
        setFailure(true);
    }
}

export default function UploadBase({ uploadData, setUploadData, toggleShelf, setFailure, setSuccess }) {
    const location = useLocation();
    const [uploading, setUploading] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!uploadData.file) {
            alert('Please select a file to upload.')
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
                console.log('S3 Upload Success:', response)
                const { url, fields } = await response.json()
                const formData = new FormData()
                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    console.log(key, value)
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
    }

    async function setFile(e) {
        const files = e.target.files
        if (files && files[0]) {
            console.log(files[0])
            setUploadData({ ...uploadData, file: files[0] })
        }
    }

    return (
        <div className="flex flex-col justify-between items-start pb-5">
            {
                uploadData.file &&
                <div className='relative h-[200px] w-[200px] flex flex-row items-center justify-left bg-transparent p-2 mx-4 rounded-lg'>
                    <Image fill src={URL.createObjectURL(uploadData.file)} alt="preview image" className="rounded-md object-cover " />
                </div>
            }
            <form className='w-full px-4' onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-left w-full h-full p-1">
                    <input
                        className='hidden'
                        id="file"
                        type="file"
                        onChange={setFile}
                        accept="image/png, image/jpeg"
                    />

                    {isMobile &&
                        <><span>&nbsp; or &nbsp; </span><label className='rounded-md  px-4 py-2 hover:cursor-pointer bg-slate-700 hover:shadow-md ' htmlFor="camera-pic">
                            Take a picture
                            <input id='camera-pic' type="file" accept="image/*" capture="camera" className="hidden" onChange={setFile}></input>
                        </label>
                        </>
                    }

                </div>

                <textarea
                    className='h-full w-full rounded-lg p-2 mb-1 bg-slate-700 '
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
                <div className="px-20 w-full flex flex-row justify-between">
                    <div className="w-1/3 flex flex-row items-center justify-center" >

                        <label className='rounded-md px-4 py-2 hover:cursor-pointer bg-slate-700 hover:shadow-md ' htmlFor="file">
                            {uploadData.file ? 'Select a new file' : 'Select a file'}
                        </label>
                    </div>

                    <div className="w-1/3 flex flex-row items-center justify-center" >
                        <button className='block rounded-md hover:cursor-pointer min-w-fit px-4 py-2 bg-slate-700' type="submit" disabled={uploading}>
                            {
                                !uploading ?
                                    "Upload" :
                                    <Loading />

                            }
                        </button>

                    </div>

                    <div className="w-1/3 flex flex-row items-center justify-center h-8" >
                        {
                            uploadData?.file?.name ?
                                (<span className="block rounded-md px-4 py-2 bg-slate-700 overflow-scroll whitespace-nowrap">
                                    {uploadData.file?.name}
                                </span>) : null
                        }

                    </div>
                </div>
            </form>

        </div>
    )
}