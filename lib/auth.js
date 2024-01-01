
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        session: async ({ session, user }) => {
            if (session && session.user && user) {
                session.user.id = user.id;
                session.user.name = user.name;
            }
            return Promise.resolve(session);
        },
    }
};
