
import Image from 'next/image';
import { sql } from '@vercel/postgres';

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

export default async function Page() {
  async function getPosts() {
    // 'use server'
    const { rows } = await sql`SELECT * from posts`;
    return rows;
  }
  const posts = await getPosts()
  console.log(posts)
  return (
    <>

      <main className='overflow-scroll'>
        <div className='flex flex-wrap justify-center'>

          {posts && posts.map(post => (
            <div key={post.id} className='w-1/3 p-2'>
              <div className='bg-slate-200 rounded-lg shadow-lg'>
                <div className='flex justify-center'>
                  <Image
                    className='w-full h-64 object-cover'
                    src={`${url}${encodeS3Key(post.id)}`}
                    alt={`${post.title ? post.title : 'Post'}`}
                    width={300}
                    height={300}
                  />
                </div>
                <div className='px-4 py-4'>
                  <h1 className='text-xl font-bold text-gray-800'>
                    {post.title}
                  </h1>
                  <p className='py-2 text-gray-700'>{post.description}</p>
                  <div className='flex justify-between items-center mt-4'>
                    <a
                      className='text-blue-500 hover:underline'
                      href={`post/${encodeS3Key(post.id).slice(0, -4)}`}
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};