'use client'
import { useState, useEffect } from "react";
import Loading from '../animations/loading';

// TODO 

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

export default function UploadBase({ location, uploadData, setUploadData, toggleShelf, setFailure, setSuccess }) {
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
        <>
            <form className='flex flex-col justify-center items-start w-full h-full p-2' onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-center w-full h-full p-1">
                    <label className='bg-slate-200 rounded-md p-1 text-slate-800 hover:cursor-pointer' htmlFor="file">
                        {uploadData.file ? 'Select a new file' : 'Select a file'}
                    </label>
                    <input
                        className='bg-blue-500 rounded-lg hidden'
                        id="file"
                        type="file"
                        onChange={setFile}
                        accept="image/png, image/jpeg"
                    />
                    {isMobile && <><span>&nbsp; or &nbsp; </span><label className='bg-slate-200 rounded-md p-1 text-slate-800 hover:cursor-pointer' htmlFor="camera-pic">
                        Take a picture
                        <input id='camera-pic' type="file" accept="image/*" capture="camera" className="hidden" onChange={setFile}></input>
                    </label></>}

                </div>
                <span>
                    {uploadData.file && uploadData.file.name}
                </span>
                <textarea
                    className='bg-slate-200 text-slate-800 h-full w-full rounded-lg mt-2 p-2'
                    type='text'
                    id='content'
                    placeholder='Write your thoughts here!'
                    onChange={
                        (e) => {
                            setUploadData({ ...uploadData, text: e.target.value })
                        }
                    }
                    value={uploadData.text}
                >
                </textarea>

                {!uploading ? <button className='block bg-slate-500 text-slate-300 rounded-md hover:cursor-pointer min-w-fit w-auto px-4 py-2 mt-2' type="submit" disabled={uploading}>
                    Upload
                </button> :
                    <button className='block bg-slate-500 text-slate-300 rounded-md min-w-fit w-auto px-4 py-2 mt-2' type="submit" disabled={uploading}>
                        <Loading />
                    </button>
                }
            </form>
        </>
    )
}