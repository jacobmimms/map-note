import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";
import { randomUUI, randomBytes } from "crypto";
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}
                if (!email || !password) {
                    throw new Error("Missing username or password");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                console.log(user, "user")
                // if user doesn't exist or password doesn't match
                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }
                console.log("no error")
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,

        }),
    ],

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 * 2, // 48 hours
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes?.(32).toString("hex");
        }
    },
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
};

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(
    authOptions
);


