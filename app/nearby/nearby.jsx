'use client'
import Image from 'next/image';
import Loading from '../components/animations/loading';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import useLocation from '@/app/hooks/location';
import { useEffect, useState } from 'react';


// async function getPosts({ latitude, longitude }) {
//     // const posts = await prisma.post.findMany({
//     //     orderBy: {
//     //         createdAt: 'desc'
//     //     },
//     //     take: 10
//     // });

//     // find posts that are nearest to the user

//     async function getPostsOrderedByProximity(latitude, longitude) {
//         const query = `
//           SELECT *, earth_distance(
//             ll_to_earth(${lat}, ${long}),
//             ll_to_earth("latitude", "longitude")
//           ) as distance
//           FROM "Post"
//           ORDER BY distance ASC
//         `;

//         return await prisma.$queryRaw(query);
//     }

//     const posts = await getPostsOrderedByProximity(latitude, longitude);



//     if (!posts) {
//         return null;
//     }
//     return posts;
// }

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
        <>
            <h1 className='text-2xl font-bold text-slate-200 bg-slate-600 w-full'>
                Nearby Posts
            </h1>
            <hr className='my-2' />
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2 className='text-wrap'>{post.title}</h2>
                        <p>{post.content}</p>
                        <Image
                            className='w-full h-64 object-cover'
                            src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                            alt={`${post.content ? post.content : 'Post'}`}
                            width={300}
                            height={300}
                        />

                        <hr className='my-2' />

                    </div>
                ))}
            </div>
        </>)
}

export default Nearby;