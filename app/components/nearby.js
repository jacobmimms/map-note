import Image from 'next/image';
import Loading from './animations/loading';
import { sql } from '@vercel/postgres';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';



async function getPosts() {
    const posts = await sql`SELECT * from post_db`;
    if (!posts) {
        return null;
    }
    return posts.rows;
}

async function Nearby() {
    const posts = await getPosts();
    if (!posts) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <Loading />
            </div>
        )
    }
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.id}</h2>
                    <p>{post.description}</p>
                    <Image
                        className='w-full h-64 object-cover'
                        src={`${BUCKET_URL}${encodeS3Key(post.id)}`}
                        alt={`${post.description ? post.description : 'Post'}`}
                        width={300}
                        height={300}
                    />
                </div>
            ))}
        </div>)
}

export default Nearby;