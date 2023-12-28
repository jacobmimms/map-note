import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }) {
    return (
        <div className='w-[160px] text-xs p-2 m-1 bg-slate-800 rounded-lg z-0'>
            <div className='relative w-full h-[140px] z-0'>
                {post.latitude && post.longitude &&
                    <div className='absolute -top-2 -right-2 z-[6]'>
                        <Link className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md hover:bg-slate-500  border-slate-700 border-2 p-1' href={{ pathname: '/explore', query: { latitude: post.latitude, longitude: post.longitude } }}>
                            <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6" />
                        </Link>
                    </div>
                }
                {post.distance &&
                    <div className='group absolute -top-2 -left-2 z-[6]'>
                        <div className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md border-slate-700 border-2 p-1'>
                            <FontAwesomeIcon icon={faRulerHorizontal} className="h-6 w-6" />
                            <span className='pl-1 group-hover:block hidden'>{(post.distance / 1000).toFixed(1)} km </span>
                        </div>
                    </div>
                }
                {post.created_at &&
                    <div className='group absolute -bottom-2 -left-2 z-10'>
                        <div className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md border-slate-700 border-2 p-1'>
                            <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6" />
                            <span className='pl-1 group-hover:block hidden'>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                }
                <div className='absolute -bottom-2 -right-2 z-10'>
                    <Link className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md border-slate-700 border-2 p-1' href={`/post/${post.title}`}>
                        <FontAwesomeIcon icon={faLink} className="h-6 w-6" />
                    </Link>
                </div>
                <Image
                    fill
                    className='object-cover rounded-md'
                    src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                    alt={`${post.content ? post.content : 'Post'}`}
                />

            </div>

            <div className='justify-center content-center items-center flex flex-col w-full pt-2 gap-2'>

                <div className='text-center w-full overflow-scroll whitespace-nowrap'>
                    {post.content}
                </div>
            </div>

        </div>
    )
}