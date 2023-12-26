import prisma from '@/lib/prisma';
import { URLSearchParams } from 'url';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import Image from 'next/image';
import Link from 'next/link';


async function getUserData(user) {
    const userData = await prisma.user.findMany({
        where: {
            email: user
        },
        include: { posts: true },
    })
    return userData[0];

}

export default async function UserPage({ params }) {
    const { user } = params
    const email = new URLSearchParams(user).keys().next().value
    const userData = await getUserData(email)
    return (
        <div className="flex flex-col w-full h-full justify-start items-start gap-2">
            <h1 className='text-3xl w-full text-center'>
                {userData.name}
            </h1>
            <h2 className='text-md w-full text-center'>
                {userData.email}
            </h2>
            <div className='flex flex-row flex-wrap justify-center w-full'>
                {userData.posts.map((post) => (
                    <div key={post.id} className='relative w-[150px] h-[100px]   md:w-[250px] md:h-[200px]'>
                        <Link href={`/post/${post.title}`}>
                            <Image
                                fill
                                className=' object-cover rounded-md'
                                src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                                alt={`${post.content ? post.content : 'Post'}`}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
