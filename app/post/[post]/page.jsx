import Image from 'next/image'

import { sql } from '@vercel/postgres';


export async function generateStaticParams() {
    const { rows } = await sql`SELECT * from post_db`;
    return rows.map((post) => ({
        post: post.id,
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


export default function Page({ params }) {
    const { post } = params
    let srcUrl = `${url}${encodeS3Key(decodeS3Key(post))}`
    console.log(post)
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="bg-gray-700 p-4 rounded shadow-lg">
                <Image width={300} height={300} src={srcUrl} alt='pop up image' className="rounded" />
            </div>
            <span className="text-4xl mb-4 bg-gray-700 p-2 rounded">{post.description}</span>

        </div>
    )
}