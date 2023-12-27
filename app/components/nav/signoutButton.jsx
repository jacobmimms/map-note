'use client'
import { signOut } from 'next-auth/react';

export default function SignoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })} className='bg-slate-700 rounded-md p-2 flex flex-row h-full w-full items-center justify-center select-none'>Sign out</button>
    )
}