import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(request) {
    try {
        console.log(prisma, )
        const posts = await prisma.post.findMany()
        return NextResponse.json(posts);

    } catch (error) {
        console.error("error getting posts", error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    try {
        // insert user's post into db
        const { description, latitude, longitude, authorId } = await request.json();
        const result = await prisma.post.create({
            data: {
                description: description,
                latitude: latitude,
                longitude: longitude,
                authorId: authorId
            }
        })
        return NextResponse.json(result);
    } catch (error) {
        console.error("error setting post", error);
        return NextResponse.error(error);
    }
}