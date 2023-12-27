import Image from 'next/image'
import { encodeS3Key } from '@/app/utils/main';
import prisma from '@/lib/prisma';

async function getPostData(post) {
    const postData = await prisma.post.findMany({
        where: {
            title: post
        }
    })
    return postData[0];
}

const url = 'https://mimms-pictures.s3.amazonaws.com/'

export default async function Page({ params }) {
    const post_name = params.post
    let srcUrl = `${url}${encodeS3Key(post_name)}`
    const post = await getPostData(post_name)

    return (
        <div className='flex flex-col h-full p-4'>
            <div className='relative min-h-[50%] max-h-[80%]'>
                <Image fill src={srcUrl} alt='pop up image' className=" object-contain" />
            </div>
            <span className="p-4 bg-slate-800 rounded-md">{post.content}</span>
        </div>

    )
}