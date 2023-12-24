import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }) {
    return (
        <div className='w-full p-2'>

            <div className='relative w-full h-48'>
                <Image
                    fill
                    className=' object-cover rounded-md'
                    src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                    alt={`${post.content ? post.content : 'Post'}`}
                />
            </div>

            <div className='flex flex-col overflow-none whitespace-nowrap w-full pl-[5%] mt-2 gap-2'>
                {post.content}
                {post.latitude && post.longitude &&
                    <Link className='bg-slate-700 rounded-md hover:bg-slate-600 w-24 text-center p-2' href={{ pathname: '/explore', query: { latitude: post.latitude, longitude: post.longitude } }}>
                        Map Link
                    </Link>
                }
            </div>

            <div className=' w-[90%] pl-[5%]'>
                <hr className='my-2' />
            </div>

        </div>
    )
}