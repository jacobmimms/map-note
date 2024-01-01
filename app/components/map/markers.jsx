import { useState, useEffect, useContext } from 'react'
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main'
import PopupMarker from './popupMarker'
import { PostsContext } from '@/app/providers/postsProvider'


export default function Markers() {
    const { postState, dispatch } = useContext(PostsContext);

    if (postState.posts.length === 0) {
        return null
    }
    return (
        <>
            {postState.posts.map((post) => {
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