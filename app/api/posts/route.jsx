import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { rows } = await sql`SELECT * FROM post_db`;
        return NextResponse.json(rows);

    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}


export async function POST(request) {
    try {
        const { id, description, latitude, longitude, timestamp, delete_all } = await request.json();
        if (delete_all) {
            const result = await sql`DELETE FROM post_db`;
            return NextResponse.json(result);
        }
        if (!id) {
            const { rows } = await sql`
            SELECT * FROM (
                SELECT *, 
                    6371 * 2 * ASIN(SQRT(
                        POWER(SIN((${latitude} - abs(latitude)) * pi()/180 / 2),
                        2) + COS(${latitude} * pi()/180 ) * COS(abs(latitude) * pi()/180)
                        * POWER(SIN((${longitude} - longitude) * pi()/180 / 2), 2) 
                    )) as distance
                FROM post_db
            ) AS post_db_with_distance
            WHERE distance < 0.1
        `;
            console.log("nearby rows")
            console.log(rows);
            return NextResponse.json(rows);
        }

        const result = await sql`INSERT INTO post_db (id, description, latitude, longitude, timestamp) VALUES (${id}, ${description}, ${latitude}, ${longitude}, ${timestamp})`;

        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.error(error);
    }
}