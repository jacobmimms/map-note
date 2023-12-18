import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email } = request.json();
    console.log(email);
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    console.log(user);
    return NextResponse.json(user);
}