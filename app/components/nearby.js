import Image from 'next/image';
import Loading from './animations/loading';
import { sql } from '@vercel/postgres';
const url = 'https://mimms-pictures.s3.amazonaws.com/'

function encodeS3Key(key) {
    try {
        // Encode the key and replace spaces with '+'
        const encodedKey = encodeURIComponent(key).replace(/%20/g, '+');
        return encodedKey;
    } catch (error) {
        console.error('Error encoding S3 key:', error);
        return null;
    }
}

async function getPosts() {
    // const posts = await sql`DROP TABLE IF EXISTS posts`;
    // await new Promise(resolve => setTimeout(resolve, 1000));

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
    if (posts) {
        return (
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.id}</h2>
                        <p>{post.description}</p>
                        <Image
                            className='w-full h-64 object-cover'
                            src={`${url}${encodeS3Key(post.id)}`}
                            alt={`${post.description ? post.description : 'Post'}`}
                            width={300}
                            height={300}
                        />
                    </div>
                ))}
            </div>)
    }
    return null
}

export default Nearby;