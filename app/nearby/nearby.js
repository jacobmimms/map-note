import Image from 'next/image';
import Loading from '../components/animations/loading';
import { sql } from '@vercel/postgres';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import prisma from '@/lib/prisma';


async function getPosts() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });
    if (!posts) {
        return null;
    }
    return posts;
}

async function Nearby() {
    const posts = await getPosts();
    if (!posts) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-full'>
                There are no posts
            </div>
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