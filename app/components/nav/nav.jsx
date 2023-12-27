import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { authOptions } from "@/lib/auth"
import NavLink from './navLink'
import UserNav from "./userNav"
import React from "react"

export default async function Nav() {
    const session = await getServerSession(authOptions)
    const providers = await getProviders()

    return (
        <div className="flex flex-row h-full w-full pl-8">
            <NavLink className={`w-1/3`} href='/nearby'>
                Nearby
            </NavLink>
            <NavLink className={`w-1/3`} href='/explore'>
                Explore
            </NavLink>
            <UserNav className={`w-1/3`} session={session} providers={providers} />
        </div >
    )
}