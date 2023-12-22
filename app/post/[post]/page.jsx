import Image from 'next/image'
import { sql } from '@vercel/postgres';
import { encodeS3Key } from '@/app/utils/main';
import prisma from '@/lib/prisma';

export async function generateStaticParams() {
    // const { rows } = await sql`SELECT * from post_db`;
    // return rows.map((post) => ({
    //     params: {
    //         post: { post }
    //     },

    // }))
    const posts = await prisma.post.findMany()
    return posts.map((post) => ({
        params: {
            post: post.title
        }
    }))
}

const url = 'https://mimms-pictures.s3.amazonaws.com/'

export default async function Page({ params }) {
    const { post } = params;
    // const { rows } = await sql`SELECT * from post_db WHERE id = ${post}`;
    const rows = await prisma.post.findMany({
        where: {
            title: post
        }
    })
    const content = rows[0].content;
    let srcUrl = `${url}${encodeS3Key(post)}`
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="bg-gray-700 p-4 rounded shadow-lg">
                <Image width={300} height={300} src={srcUrl} alt='pop up image' className="rounded" />
            </div>
            <span className="text-4xl mb-4 bg-gray-700 p-2 rounded">{content}</span>

        </div>
    )
}