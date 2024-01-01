import { URLSearchParams } from 'url';
import prisma from '@/lib/prisma';
import GroupInterface from './groupInterface';
import UserPosts from './userPosts';
import GroupInfo from './groupInfo';

async function getUserData(userEmail) {
    const userData = await prisma.user.findMany({
        where: {
            email: userEmail
        },
        include: {
            posts: true,
        },

    })
    return userData[0];
}


function UserHeader({ userData }) {
    return (
        <div>
            <h1 className='text-3xl w-full text-center'>
                {userData.name}
            </h1>
            <h2 className='text-md w-full text-center'>
                {userData.email}
            </h2>
        </div>
    )
}

async function GroupInformation({ userId }) {
    const userGroups = await prisma.group.findMany({
        where: {
            ownerId: userId
        },
        include: {
            posts: true
        }
    })

    return (
        <div>
            <h1>My Groups</h1>
            <section className='w-full flex flex-col'>
                {
                    userGroups && userGroups.map(group => {
                        return (
                            <GroupInfo key={group.id} group={group} />
                        )
                    })
                }
            </section>
        </div>
    )
}

export default async function UserPage({ params }) {
    const { user } = params
    const email = new URLSearchParams(user).keys().next().value
    const userData = await getUserData(email);
    return (
        <div className="flex flex-col w-full h-full justify-start items-start gap-2">
            <UserHeader userData={userData} />
            <UserPosts posts={userData.posts} />
            <GroupInformation />
            <GroupInterface />
        </div>
    )
}
