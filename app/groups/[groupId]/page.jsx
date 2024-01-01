import prisma from '@/lib/prisma';

async function getGroupData(groupId) {
    console.log(groupId)
    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        },
        include: {
            posts: true,
            owner: true,
        },
    })
    console.log(group)
    return group;
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

export default async function GroupPage({ params }) {
    const { groupId } = params
    const group = await getGroupData(groupId)

    return (
        <div className="flex flex-col w-full h-full justify-start items-start">
            {group && <UserHeader userData={group.owner} />}
        </div>
    )
}
