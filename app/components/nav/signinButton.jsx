'use client'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function SigninButton({ provider }) {
    const pathname = usePathname()
    return (
        <>
            <button className="flex flex-row gap-2 h-full items-center justify-center" onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/nearby' })}>
                Sign in with
                <Image loading="lazy" height="20" width="20" id="provider-logo" src={`https://authjs.dev/img/providers/${provider.id}.svg`} alt="provider image" />
            </button>
        </>
    )
}
