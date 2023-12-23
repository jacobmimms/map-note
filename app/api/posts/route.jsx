import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request) {
    try {
        const rows = await prisma.post.findMany();
        return NextResponse.json(rows);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    const session = await getServerSession({ req: request, ...authOptions });
    console.log(session, "session");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!session) {
        return NextResponse.redirect(`${baseUrl}`);
    }
    // get user id from database
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    const userId = user.id;
    console.log(userId, "userId");



    try {
        const { title, content, latitude, longitude, delete_all } = await request.json();
        if (delete_all) {
            const result = await prisma.post.deleteMany({});
            return NextResponse.json(result);
        }
        // if (!id) {
        //     const rows = await prisma.post.findMany({
        //         where: {
        //             latitude: {
        //                 gt: latitude - 0.1,
        //                 lt: latitude + 0.1
        //             },
        //             longitude: {
        //                 gt: longitude - 0.1,
        //                 lt: longitude + 0.1
        //             }
        //         }
        //     });
        //     console.log("nearby rows")
        //     console.log(rows);
        //     return NextResponse.json(rows);
        // }
        const result = await prisma.post.create({
            data: {
                authorId: userId,
                title: title,
                content: content,
                latitude: latitude,
                longitude: longitude,
            }
        });
        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}