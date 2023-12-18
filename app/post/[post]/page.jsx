import Image from 'next/image'
import { sql } from '@vercel/postgres';
import prisma from '@/lib/prisma'

export async function generateStaticParams() {
    const posts = await prisma.post.findMany()
    return posts.map((post) => ({
        params: {
            post: { post }
        }
    }))
}

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
function decodeS3Key(key) {
    try {
        // Decode the key and replace '+' with spaces
        const decodedKey = decodeURIComponent(key).replace(/\+/g, ' ');
        return decodedKey;
    } catch (error) {
        console.error('Error decoding S3 key:', error);
        return null;
    }
}


export default async function Page({ params }) {
    const { post } = params;
    const { rows } = await sql`SELECT * from post_db WHERE id = ${post}`;
    const description = rows[0].description;
    let srcUrl = `${url}${encodeS3Key(decodeS3Key(post))}`
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="bg-gray-700 p-4 rounded shadow-lg">
                <Image width={300} height={300} src={srcUrl} alt='pop up image' className="rounded" />
            </div>
            <span className="text-4xl mb-4 bg-gray-700 p-2 rounded">{description}</span>

        </div>
    )
}