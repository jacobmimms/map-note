import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(request) {
    try {
        const posts = await prisma.post.findMany()
        return NextResponse.json(posts);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    // schema 
    //
    // model Post {
    //     id          String   @id
    //     description String
    //     latitude    Float
    //     longitude   Float
    //     createdAt   DateTime @default(now())
    //     updatedAt   DateTime @updatedAt
    //     author      User     @relation(fields: [authorId], references: [id])
    //     authorId    String
    //   }

    //   model User {
    //     id            String    @id @default(cuid())
    //     name          String?
    //     email         String?   @unique
    //     emailVerified DateTime?
    //     image         String?
    //     accounts      Account[]
    //     sessions      Session[]
    //     posts         Post[]
    //   }
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

        console.log(result)


        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}