'use client'
import { signOut } from 'next-auth/react';

export default function SignoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })}>Sign out</button>
    )
}