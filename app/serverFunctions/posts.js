import { sql } from '@vercel/postgres';

export async function getPosts(userId) {
    const posts = !userId
        ? await sql`SELECT * from post`
        : await sql`SELECT * from post WHERE id = ${userId}`;
    if (!posts.rows) {
        return null;
    }
    return posts.rows;
}
