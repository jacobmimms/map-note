'use client'
import Loading from '@/app/components/animations/loading';
import { useContext, useEffect, useState, useMemo } from 'react';
import PostCard from './postCard';
import { PostsContext } from '@/app/providers/postsProvider';

function Nearby() {
    const { postState, dispatch } = useContext(PostsContext);
    const [sortBy, setSortBy] = useState('proximity');
    const [posts, setPosts] = useState(postState.posts);

    const memoSort = useMemo(() => {
        if (sortBy === 'proximity') {
            return [...posts].sort((a, b) => a.distance - b.distance);
        }
        if (sortBy === 'date') {
            return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
    }, [posts, sortBy]);

    useEffect(() => {
        if (postState.posts.length) {
            setPosts(postState.posts);
        }
    }, [postState.posts])

    if (postState.loading) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>
        )
    }

    return (
        <section className='w-full flex flex-col bg-slate-700 rounded-md z-0'>

            <div className='fixed top-[60px] bg-slate-800 z-8 rounded-br-md p-2 z-10'>
                <span className='pr-2'>
                    sort by:

                </span>
                <select className='bg-slate-800 text-slate-300 h-full text-center' onChange={(e) => setSortBy(e.target.value)}>
                    <option value='proximity'>proximity</option>
                    <option value='date'>date</option>
                </select>
            </div>

            <div className='pt-[40px] w-full flex flex-row min-h-full flex-wrap items-between justify-around overflow-scroll content-center z-0'>
                {memoSort
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