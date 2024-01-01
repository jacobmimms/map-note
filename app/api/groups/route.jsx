import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request) {
    const session = await getServerSession({ req: request, ...authOptions });
    const user = session.user;
    try {
        const groups = await prisma.groups.findMany(
            {
                where: {
                    ownerId: user.id
                }
            }
        )
        return NextResponse.json(groups);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}

export async function POST(request) {
    try {
        const { name } = await request.json();
        const session = await getServerSession({ req: request, ...authOptions });
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!session) {
            return NextResponse.redirect(`${baseUrl}`);
        }

        const group = await prisma.group.create({
            data: {
                name: name,
                ownerId: session.user.id
            }
        })
        return NextResponse.json(group);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}
