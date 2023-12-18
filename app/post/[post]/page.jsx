import Image from 'next/image'
import { sql } from '@vercel/postgres';
import { encodeS3Key, decodeS3Key } from '@/app/utils/main';

export async function generateStaticParams() {
    const { rows } = await sql`SELECT * from post_db`;
    // return params { id, description, latitude, longitude, timestamp} for each post
    return rows.map((post) => ({
        params: {
            post: { post }
        },

    }))
}

const url = 'https://mimms-pictures.s3.amazonaws.com/'

export default async function Page({ params }) {
    const { post } = params;
    const { rows } = await sql`SELECT * from post_db WHERE id = ${post}`;
    const description = rows[0].description;
    let srcUrl = `${url}${encodeS3Key(post)}`
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="bg-gray-700 p-4 rounded shadow-lg">
                <Image width={300} height={300} src={srcUrl} alt='pop up image' className="rounded" />
            </div>
            <span className="text-4xl mb-4 bg-gray-700 p-2 rounded">{description}</span>

        </div>
    )
}