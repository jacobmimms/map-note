'use client'
import Loading from '../components/animations/loading';
import { useContext, useEffect, useState, useRef } from 'react';
import PostCard from './postCard';
import { PostsContext } from '@/app/providers/postsProvider';
import { LocationContext } from '@/app/providers/locationProvider';
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


function Nearby() {
    const location = useContext(LocationContext);
    const { state, dispatch } = useContext(PostsContext);
    const [lastLocation, setLastLocation] = useState({ latitude: null, longitude: null });
    const [sortBy, setSortBy] = useState('proximity');
    const [posts, setPosts] = useState(state.posts);

    useEffect(() => {
        if (location.latitude == null && location.longitude == null) {
            return;
        }
        const distance = calculateDistance(
            lastLocation.latitude, lastLocation.longitude,
            location.latitude, location.longitude
        );
        if (state.posts.length > 0) {
            return;
        }
        if (distance > 100 || lastLocation.latitude === null) {
            setLastLocation({ latitude: location.latitude, longitude: location.longitude });
            getNearbyPosts(location).then(fetchedPosts => {
                dispatch({ type: 'SET_POSTS', payload: fetchedPosts });
                setPosts(fetchedPosts);
            });
        }
    }, [location, state.posts, dispatch, lastLocation])

    useEffect(() => {
        if (sortBy === 'proximity') {
            const sortedByProximity = [...posts].sort((a, b) => a.distance - b.distance);
            setPosts(sortedByProximity);
        } else if (sortBy === 'date') {
            const sortedByDate = [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            setPosts(sortedByDate);
        }
    }, [sortBy])


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

    if (state.posts == null) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>
        )
    }

    return (
        <section className='w-full overflow-scroll flex flex-col items-center justify-center bg-slate-700 rounded-md'>
            <div className='relative w-full h-[30px] z-10'>
                <div className='fixed pl-3 py-1 bg-slate-700 rounded-br-lg rounded-tl-lg'>
                    sort by:
                    <select className='bg-slate-700 text-slate-300 h-full text-center' onChange={(e) => setSortBy(e.target.value)}>
                        <option value='proximity'>proximity</option>
                        <option value='date'>date</option>
                    </select>
                </div>
            </div>

            <div className='w-full flex flex-row flex-wrap items-between justify-around content-center'>
                {posts
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