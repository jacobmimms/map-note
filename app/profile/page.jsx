import Image from 'next/image';
import auth from '@/auth.js';
import { getPosts } from '../serverFunctions/posts.jsx'

export default async function Profile() {
    const session = await auth()
    const user = session?.user
    console.log(session, "session from app/profile/page.jsx")
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