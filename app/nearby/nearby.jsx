'use client'
import Loading from '../components/animations/loading';
import { useContext, useEffect, useState } from 'react';
import PostCard from './postCard';
import { PostsContext } from '@/app/providers/postsProvider';


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


function Nearby() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const { state, dispatch } = useContext(PostsContext);

    function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    useEffect(() => {
        getLocation().then(
            (position) => {
                console.log(position)
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            }, (error) => {
                console.error(error);
            }
        );
    }, []);

    useEffect(() => {
        if (!location || (location.latitude == 0 && location.longitude == 0) || state.posts.length > 0) {
            return;
        }
        getNearbyPosts(location).then(
            (fetchedPosts) => {
                dispatch({ type: 'SET_POSTS', payload: fetchedPosts });
            }
        );

    }, [location, state.posts, dispatch])

    if (!location || state.posts == null) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>
        )
    }

    return (
        <section className='w-full overflow-scroll flex flex-col items-center justify-center'>
            <div className='w-full flex flex-row flex-wrap items-between justify-around content-center'>
                {state.posts
                    .map(
                        (post) => (
                            <PostCard key={post.id} post={post} />
                        )
                    )
                }
            </div>
        </section>
    )

}

export default Nearby;