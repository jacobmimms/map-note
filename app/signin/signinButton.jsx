'use client'
import { signIn } from "next-auth/react"
import Image from 'next/image'

export default function SignInButton({ provider }) {
    return (
        <>
            <button onClick={() => signIn(provider.id)}>
            <div className="flex flex-row gap-3 rounded-md p-2 bg-slate-500">
                    <Image loading="lazy" height="24" width="24" id="provider-logo" src={`https://authjs.dev/img/providers/${provider.id}.svg`} alt="provider image"/>
                Sign in with {provider.name}
                </div>
            </button>
        </>
    )
}
