import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req) {
    // Get the pathname of the request (e.g. /, /protected)
    const path = req.nextUrl.pathname;

    // If it's the root path, just render it
    if (path === "/") {
        return NextResponse.next();
    }

    const session = await auth()


    if (!session && path === "/protected") {
        return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && (path === "/login" || path === "/register")) {
        return NextResponse.redirect(new URL("/protected", req.url));
    }
    return NextResponse.next();
}