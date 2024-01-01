import Link from 'next/link'
import Image from 'next/image'
import { encodeS3Key, BUCKET_URL } from '@/app/utils/main';


export default function UserPosts({ posts }) {
    return (
        <div className='flex flex-col'>
            <span> My posts</span>
            <div className='flex flex-row flex-wrap gap-2 justify-center w-full'>
                {posts.map(
                    (post) => (
                        <div key={post.id} className='relative w-[200px] h-[160px] sm:w-[250px] sm:h-[200px]'>
                            <Link href={`/post/${post.title}`}>
                                <Image
                                    fill
                                    className=' object-cover rounded-md'
                                    src={`${BUCKET_URL}${encodeS3Key(post.title)}`}
                                    alt={`${post.content ? post.content : 'Post'}`}
                                />
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div >
    )
}