import Image from 'next/image'
const url = 'https://mimms-pictures.s3.amazonaws.com/'

export async function generateStaticParams() {
    // set dev endpoint to localhost:3000/api/posts and prod endpoint to map-note.vercel.app/api/posts

    const apiEndpoint =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api/posts'
            : 'https://map-note.vercel.app/api/posts'


    const posts = await fetch(apiEndpoint, { method: 'GET' })
    const postsJson = await posts.json()
    return postsJson.map((post) => ({
        post: post.id,
    }))
}

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


export default function Page({ params }) {
    const { post } = params
    let srcUrl = `${url}${encodeS3Key(decodeS3Key(post))}.jpg`

    return (
        <div className="bg-green-500 w-full h-full">
            <h1 className="bg-red-500">{post}</h1>
            <Image width={300} height={300} src={srcUrl} alt='pop up image' />
        </div>
    )
}