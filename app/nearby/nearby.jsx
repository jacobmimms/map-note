'use client'
import Image from 'next/image';
import Loading from '../components/animations/loading';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import { useEffect, useState } from 'react';
import PostCard from './postCard';



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

    const [posts, setPosts] = useState(null);
    useEffect(() => {
        if (!location || (location.latitude == 0 && location.longitude == 0)) {
            return;
        }
        getNearbyPosts(location).then(
            (posts) => {
                setPosts(posts);
            }
        );

    }, [location])

    if (!location || posts == null) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}><Loading /></div>
        )
    }

    return (
        <section className='w-full overflow-scroll flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-slate-200 bg-slate-600 mt-2'>
                Nearby Posts
            </h1>
            <div className='w-[50%]'>
                <hr className='my-1' />
            </div>
            <div className='w-full flex flex-col flex-wrap items-center justify-center'>
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