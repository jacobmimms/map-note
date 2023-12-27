'use client'
import { signIn } from "next-auth/react"
import Image from 'next/image'

export default function SigninButton({ provider }) {
    return (
        <>
            <button className="flex flex-row w-full bg-slate-700 rounded-lg gap-2 items-center justify-center py-1 px-2" onClick={() => signIn(provider.id, { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/nearby` })}>
                Sign in with
                <Image loading="lazy" height="20" width="20" id="provider-logo" src={`https://authjs.dev/img/providers/${provider.id}.svg`} alt="provider image" />
            </button>
        </>
    )
}
