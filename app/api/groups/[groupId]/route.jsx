import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function DELETE(request) {
    try {
        const groupId = request.url.split("/").pop();
        const session = await getServerSession({ req: request, ...authOptions });
        const user = session.user;
        const group = await prisma.group.findUnique({
            where: {
                id: groupId
            }
        });
        if (group.ownerId !== user.id) {
            return NextResponse.error("You are not the owner of this group");
        }
        await prisma.group.delete({
            where: {
                id: groupId
            }
        });
        return NextResponse.json({ message: "Group deleted" });

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}