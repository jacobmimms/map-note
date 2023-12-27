import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }) {
    return (
        <div className='w-[160px] text-xs p-2 m-1 bg-slate-700 rounded-lg z-0'>
            <div className='relative w-full h-[140px] '>
                {post.latitude && post.longitude &&
                    <div className='absolute -top-2 -right-2 z-10'>
                        <Link className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md hover:bg-slate-500  border-slate-700 border-2 p-1' href={{ pathname: '/explore', query: { latitude: post.latitude, longitude: post.longitude } }}>
                            <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6" />
                        </Link>
                    </div>
                }
                <Link href={`/post/${post.title}`}>
                    <Image
                        fill
                        className='object-cover rounded-md hover:opacity-80 hover:cursor-pointer'
                        src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                        alt={`${post.content ? post.content : 'Post'}`}
                    />
                </Link>

            </div>

            <div className='justify-center content-center items-center flex flex-col w-full pt-2 gap-2'>

                <div className='text-center w-full overflow-scroll whitespace-nowrap'>
                    {post.content}
                </div>
            </div>

        </div>
    )
}