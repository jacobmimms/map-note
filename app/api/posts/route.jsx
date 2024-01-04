import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET(request) {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}

async function getPostsOrderedByProximity(latitude, longitude) {
    console.log(latitude, longitude)
    const result = await prisma.$queryRaw`
      SELECT *, earth_distance(
        ll_to_earth(${latitude}, ${longitude}),
        ll_to_earth("latitude", "longitude")
      ) as distance
      FROM "posts"
      ORDER BY distance ASC
    `;
    return result;
}

async function getPostsInBounds(bounds) {
    console.log(bounds)
    const posts = await prisma.post.findMany(
        {
            where: {
                latitude: {
                    gte: bounds._southWest.lat,
                    lte: bounds._northEast.lat
                },
                longitude: {
                    gte: bounds._southWest.lng,
                    lte: bounds._northEast.lng
                },
            }
        },
    );
    return posts;
}


export async function POST(request) {
    try {
        const { title, content, latitude, longitude, delete_all, nearby } = await request.json();
        console.log(nearby, "nearby")
        if (delete_all) {
            const result = await prisma.post.deleteMany({});
            return NextResponse.json(result);
        }
        if (nearby) {
            const posts = await getPostsOrderedByProximity(latitude, longitude);
            return NextResponse.json(posts);
        }
        const session = await getServerSession({ req: request, ...authOptions });
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