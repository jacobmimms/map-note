'use client'
import Loading from '@/app/components/animations/loading';
import { useContext, useEffect, useState, useMemo } from 'react';
import PostCard from './postCard';
import { PostsContext } from '@/app/providers/postsProvider';

export default function NearbyPage() {
    const { postState, dispatch } = useContext(PostsContext);
    const [sortBy, setSortBy] = useState('proximity');
    const [posts, setPosts] = useState(postState.posts);

    const memoSort = useMemo(() => {
        if (sortBy === 'proximity') {
            return [...posts].sort((a, b) => a.distance - b.distance);
        }
        if (sortBy === 'date') {
            return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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
        <>
            <div className='fixed top-[60px] bg-slate-700 z-8 rounded-md p-2 mt-1 z-10'>
                <span className='pr-2'>
                    sort by:
                </span>
                <select className='bg-slate-700 text-slate-300 h-full text-center' onChange={(e) => setSortBy(e.target.value)}>
                    <option value='proximity'>proximity</option>
                    <option value='date'>date</option>
                </select>
            </div>

            <section className='w-full flex flex-col bg-slate-800 rounded-md z-0 mt-1'>

                <div className='pt-[40px] w-full flex flex-row min-h-full flex-wrap  overflow-scroll justify-center gap-1'>
                    {memoSort
                        .map(
                            (post) => (
                                <PostCard key={post.id} post={post} />
                            )
                        )
                    }
                </div>

            </section>
        </>
    )

}