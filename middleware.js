import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req) {
    return NextResponse.next();
}