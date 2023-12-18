import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request) {
    if (!request.body || !request.body.email) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { email } = request.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}