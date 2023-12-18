import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";
import { randomUUID, randomBytes } from "crypto";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
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
            return randomUUID() ?? randomBytes(32).toString("hex");
        }
    },
    callbacks: {
        async session({ session, user }) {
            console.log("session", session)
            console.log("user", user)
            return {
                ...session,
                id: user.id,
                email: user.email,
                name: user.name,
            };
        },
        // async authorized({ request, auth }) {
        //     const url = request.nextUrl
        //     console.log(url)
        //     if (request.method === "POST") {
        //         const { authToken } = (await request.json()) ?? {}
        //         // If the request has a valid auth token, it is authorized
        //         const valid = await validateAuthToken(authToken)
        //         if (valid) return true
        //         return NextResponse.json("Invalid auth token", { status: 401 })
        //     }

        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth.user
        // }
    },
};



export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(
    authOptions
)