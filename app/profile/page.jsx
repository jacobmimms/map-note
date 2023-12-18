import Image from 'next/image';
import { auth } from '../../auth'
import { getPosts } from '../serverFunctions/posts.jsx'

export default async function Profile() {
    const session = await auth()
    const user = session?.user
    const userPosts = 
    console.log(session)
    if (!session) {
        return (
            <span>
                not logged in
            </span>
        )
    }
    return (
        <>
            <h1>
                {`Hello ${user.name} `}
            </h1>
        </>

    );
}