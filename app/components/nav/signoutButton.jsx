'use client'
import { signOut } from 'next-auth/react';

export default function SignoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })} className='hover:bg-slate-800 p-4 flex flex-row h-full w-full items-center justify-center select-none'>Sign out</button>
    )
}