'use client';
import { useState, useEffect } from 'react';
import Upload from './components/upload';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
function decodeS3Key(key) {
  try {
    // Decode the key and replace '+' with spaces
    const decodedKey = decodeURIComponent(key).replace(/\+/g, ' ');
    return decodedKey;
  } catch (error) {
    console.error('Error decoding S3 key:', error);
    return null;
  }
}



const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);




  return (
    <>
      <section className='w-full h-[10%] bg-green-500 flex flex-row items-center justify-center'>
        PICTURES!
        <a href='/explore' className='p-2 bg-purple-500 '>
          Explore
        </a>
      </section>
      <main className='w-full h-full'>
        <div className='flex flex-wrap justify-center'>
          {posts.map(post => (
            <div key={post.id} className='w-1/3 p-2'>
              <div className='bg-white rounded-lg shadow-lg'>
                <div className='flex justify-center'>
                  <Image
                    className='w-full h-64 object-cover'
                    src={`${url}${encodeS3Key(decodeS3Key(post.id))}`}
                    alt={post.title}
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

export default Page;
