import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// data model
// each row is a specific post
// each post has an id which is the name of the file (picture is stored in s3 bucket)
// each post has a description, a latitude and longitude, and a timestamp


export async function GET(request) {
    try {
        const { rows } = await sql`SELECT * from posts`;
        console.log(rows);
        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}

export async function POST(request) {
    try {
        const { id, description, latitude, longitude, timestamp } = await request.json();
        // if the posts table doesn't exist, create it
        const result =
            await sql`CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        description TEXT,
        latitude NUMERIC,
        longitude NUMERIC,
        timestamp TIMESTAMP
        )`;
        console.log(result);
        // insert the post into the table
        await sql`INSERT INTO posts (id, description, latitude, longitude, timestamp) VALUES (${id}, ${description}, ${latitude}, ${longitude}, ${timestamp})`;

        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}