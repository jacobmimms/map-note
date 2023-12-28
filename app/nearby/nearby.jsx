'use client'
import Loading from '@/app/components/animations/loading';
import { useContext, useEffect, useState, useMemo } from 'react';
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
    const { postState, dispatch } = useContext(PostsContext);
    const [sortBy, setSortBy] = useState('proximity');
    const [posts, setPosts] = useState(postState.posts);

    const memoProxSort = useMemo(() => {
        return [...posts].sort((a, b) => a.distance - b.distance);
    }, [posts]);

    const memoDateSort = useMemo(() => {
        return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }, [posts]);

    useEffect(() => {
        if (sortBy === 'proximity') {
            setPosts(memoProxSort);
        } else if (sortBy === 'date') {
            setPosts(memoDateSort);
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

    if (postState.posts == null) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>
        )
    }

    return (
        <section className='w-full overflow-scroll flex flex-col items-center justify-center bg-slate-700 rounded-md z-0'>
            <div className='relative w-full h-[33px] z-8'>
                <div className='fixed px-2 py-1 bg-slate-700 rounded-br-lg rounded-tl-lg z-[8]'>
                    sort by:
                    <select className='bg-slate-700 text-slate-300 h-full text-center' onChange={(e) => setSortBy(e.target.value)}>
                        <option value='proximity'>proximity</option>
                        <option value='date'>date</option>
                    </select>
                </div>
            </div>

            <div className='w-full flex flex-row flex-wrap items-between justify-around content-center z-0'>
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