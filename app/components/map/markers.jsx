import { useState, useEffect, useContext } from 'react'
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main'
import PopupMarker from './popupMarker'



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
    if (!posts) {
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