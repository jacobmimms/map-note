import { Marker, Popup } from 'react-leaflet'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const icon_ = L.icon({
    iconUrl: './marker.png',
    iconSize: [40, 40],

});

const url = 'https://mimms-pictures.s3.amazonaws.com/'

export default function Markers() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            let res = await fetch('/api/posts', { method: 'GET' })
            let data = await res.json()
            setPosts(data)
        }
        getPosts()
    }, [])

    function encodeS3Key(key) {
        try {
            // Encode the key and replace spaces with '+'
            const encodedKey = encodeURIComponent(key).replace(/%20/g, '+');
            return encodedKey;
        } catch (error) {
            console.error('Error encoding S3 key:', error);
            return null;
        }
    }

    return (
        <>
            {posts.map((post) => {
                return (
                    <Marker key={post.id} position={[post.latitude, post.longitude]} icon={icon_}>
                        <Popup position={[post.latitude, post.longitude]}>
                            <div className='flex flex-col'>
                                <Image src={`${url}${encodeS3Key(post.id)}`} width={100} height={100} alt='pop up image' />
                                <span>{post.description}</span>
                                <a href={`post/${encodeS3Key(post.id)}`}>View Post</a>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        </>
    )
}