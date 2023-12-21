import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import auth from '@/lib/auth';


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
    const session = await getSession(request);

    try {
        const { id, title, content, latitude, longitude } = await request.json();
        if (!id) {
            const rows = await prisma.post.findMany({
                where: {
                    latitude: {
                        gt: latitude - 0.1,
                        lt: latitude + 0.1
                    },
                    longitude: {
                        gt: longitude - 0.1,
                        lt: longitude + 0.1
                    }
                }
            });
            console.log("nearby rows")
            console.log(rows);
            return NextResponse.json(rows);
        }
        const result = await prisma.post.create({
            data: {
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