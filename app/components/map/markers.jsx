import { useState, useEffect } from 'react'
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main'
import PopupMarker from './popupMarker'

export default function Markers() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            try {
                let res = await fetch('/api/posts', { method: 'GET' })
                let data = await res.json()
                setPosts(data)
            }
            catch (err) {
                console.error("Error in getPosts for markers", err);
            }
        }
        getPosts()
    }, [])

    if (posts.length === 0) {
        return null
    }
    return (
        <>
            {posts.map((post) => {
                return (
                    <PopupMarker
                        key={post.id}
                        id={post.id}
                        position={[post.latitude, post.longitude]}
                        imageSrc={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                        content={post.content}
                        link={`post/${encodeS3Key(post.title)}`}
                        linkText='View Post'
                    />
                )
            })}
        </>
    )
}