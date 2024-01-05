'use client'
import Link from 'next/link';
import Image from 'next/image'
import { PostsContext } from '@/app/providers/postsProvider';
import { useContext } from 'react';
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Loading from '@/app/components/animations/loading';

export default function Page({ params }) {
    const post_name = decodeURIComponent(params.post).replace(/\+/g, ' ')
    console.log('post_name', post_name)
    const { postState, dispatch } = useContext(PostsContext);
    const post = postState.posts.find(post => post.title === post_name)

    if (!post) {
        return (
            <div className={`flex items-center justify-center w-full h-full bg-slate-600`}>
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div className='flex flex-col items-center text-xs p-2 bg-slate-800 rounded-lg w-full h-full'>
                <div className={`relative w-full h-full rounded-lg `}>
                    <Image
                        fill
                        className='object-contain py-2'
                        src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                        alt={`${post.content ? post.content : 'Post'}`}
                    />
                </div>
                {/* <span className='text-slate-300 text-xs w-[100px] h-[20px]'>
                    {user}
                </span> */}
                <div className='justify-center bg-slate-700 p-2  rounded-lg content-center items-center flex flex-row flex-1 w-full h-full sm:w-[80%]'>
                    <div className='w-[50%] sm:w-[30%] h-full'>

                        {post.latitude && post.longitude &&
                            <div className=''>
                                <Link className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md hover:bg-slate-500  border-slate-700 border-2 p-1' href={{ pathname: '/explore', query: { latitude: post.latitude, longitude: post.longitude } }}>
                                    <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6" />
                                </Link>
                            </div>
                        }
                        {post.distance &&
                            <div className='group'>
                                <div className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md border-slate-700 border-2 p-1'>
                                    <FontAwesomeIcon icon={faRulerHorizontal} className="h-6 w-6" />
                                    <span className='pl-1 group-hover:block hidden'>{(post.distance / 1000).toFixed(1)} km </span>
                                </div>
                            </div>
                        }
                        {post.created_at &&
                            <div className='group'>
                                <div className='flex flex-row items-center justify-center bg-slate-300 text-slate-600 rounded-md border-slate-700 border-2 p-1'>
                                    <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6" />
                                    <span className='pl-1 group-hover:block hidden'>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='w-full h-full bg-slate-800  m-2 p-2 rounded-md'>
                        {post.content}
                    </div>
                </div>
            </div>
        </>)
}