import { useState, useEffect, useContext } from 'react'
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main'
import PopupMarker from './popupMarker'
import { PostsContext } from '@/app/providers/postsProvider'
import { LocationContext } from '@/app/providers/locationProvider'
import Loading from '@/app/components/animations/loading';
import { calculateDistance } from '@/app/utils/main';

async function getNearbyPosts({ latitude, longitude }) {
    let posts
    try {
        posts = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ nearby: true, latitude, longitude })
        });
        posts = await posts.json();

    } catch (error) {
        console.error("fetching posts failed", error);
    }
    return posts;
}

export default function Markers() {
    const { postState, dispatch } = useContext(PostsContext);
    const [posts, setPosts] = useState(postState.posts);
    const location = useContext(LocationContext);
    const [lastLocation, setLastLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (location.latitude == null && location.longitude == null) {
            return;
        }
        const distance = calculateDistance(
            lastLocation.latitude, lastLocation.longitude,
            location.latitude, location.longitude
        );

        if (postState.posts.length > 0) {
            return;
        }
        if (distance > 100 || lastLocation.latitude === null) {
            setLastLocation({ latitude: location.latitude, longitude: location.longitude });
            getNearbyPosts(location).then(fetchedPosts => {
                dispatch({ type: 'SET_POSTS', payload: fetchedPosts });
                setPosts(fetchedPosts);
            });
        }
    }, [location, postState.posts, dispatch, lastLocation])

    if (posts.length === 0) {
        return null
    }

    if (!location.latitude && !location.longitude) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-700`}>
                <div className={`flex flex-col items-center justify-center gap-2`}>
                    <span>
                        Fetching location...
                    </span>
                    <Loading />

                </div>
            </div>
        )
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