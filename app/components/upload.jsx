'use client'
import { useState, useEffect } from "react";

export default function Upload() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [location, setLocation] = useState();
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [text, setText] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude: latitude, longitude: longitude });
            })
        }
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, [location]);

    function renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(file)
        if (!file) {
            alert('Please select a file to upload.')
            return
        }
        setUploading(true)
        const response = await fetch('/api/upload',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
            }
        )
        if (response.ok) {
            const { url, fields } = await response.json()
            const formData = new FormData()
            Object.entries({ ...fields, file }).forEach(([key, value]) => {
                formData.append(key, value)
            })

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (uploadResponse.ok) {
                setSuccess(true)
            } else {
                console.error('S3 Upload Error:', uploadResponse)
                setFailure(true)
            }
        } else {
            alert('Failed to get pre-signed URL.')
        }

        // upload to sql database
        const { latitude, longitude } = location;
        const timestamp = new Date().toISOString();
        const id = file.name;
        const description = text;
        const post = { id, description, latitude, longitude, timestamp };
        const postResponse = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if (postResponse.ok) {
            console.log('Post uploaded to database.');
        } else {
            console.error('Post upload error:', postResponse);
        }
        setUploading(false)
    }

    async function logAllPosts() {
        let res = await fetch('/api/posts', { method: 'GET' })
        console.log(res)
        let data = await res.json()
        console.log(data)
    }

    return (
        <>
            <form className='bg-red-500 rounded-lg flex flex-col w-full p-2 h-full' onSubmit={handleSubmit}>
                <div>
                    <label className='bg-blue-500 rounded-lg p-2' htmlFor="file">
                        {file ? 'Select a new file' : 'Select a file'}
                    </label>
                    <input
                        className='bg-blue-500 rounded-lg'
                        id="file"
                        type="file"
                        onChange={async (e) => {
                            const files = e.target.files
                            if (files) {
                                setFile(files[0])
                                console.log(files[0])
                            }
                        }}
                        accept="image/png, image/jpeg"
                        style={{ display: 'none' }}
                    />
                    {isMobile && <><label className='bg-blue-500 rounded-lg p-2' htmlFor="camera-pic">
                        Take a picture
                        <input id='camera-pic' type="file" accept="image/*" capture="camera" style={{ display: 'none' }}></input>
                    </label></>}

                </div>
                <span>
                    {file && file.name}
                </span>
                <input
                    className='bg-blue-500 rounded-lg mt-2 p-2'
                    type='text'
                    id='description'
                    placeholder='Write your thoughts here!'
                    onChange={
                        (e) => {
                            setText(e.target.value)
                        }
                    }
                >
                </input>

                <button className=' block bg-green-500 rounded-full hover:cursor-pointer min-w-fit w-auto p-2 mt-2' type="submit" disabled={uploading}>
                    Upload
                </button>
            </form>
            <button onClick={logAllPosts}>
                log all posts
            </button>
        </>
    )
}