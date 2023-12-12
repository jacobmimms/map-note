export async function generateStaticParams() {

    const posts = await fetch('http://localhost:3000/api/posts', { method: 'GET' })
    const postsJson = await posts.json()
    console.log(postsJson)
    return postsJson.map((post) => ({
        test: post.id,
    }))
}

export default function Page({ params }) {
    const { test } = params
    console.log(test)
    return (
        <div className="bg-red-500 w-full h-full">
            <h1 className="bg-red-500 w-full h-full">{test}</h1>
        </div>
    )
}