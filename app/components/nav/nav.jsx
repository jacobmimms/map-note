import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { authOptions } from "@/lib/auth"
import NavLink from './navLink'
import UserNav from "./userNav"
import React from "react"


export async function getServerSideProps() {
    const session = await getServerSession(authOptions)
    const providers = await getProviders()
    console.log("session", session)
    console.log("providers", providers)
    return {
        props: {
            session,
            providers
        }
    }
}


export default async function Nav({session, providers}) {
    console.log("session", session)
    console.log("providers", providers)
    // const session = await getServerSession(authOptions)
    // const providers = await getProviders()

    return (
        <div className="ml-1 select-none flex flex-row items-end h-full w-full">
            <NavLink className={`w-1/4 text-xl md:text-3xl font-bold text-slate-300`} href='/'>
                Loc.Pics
            </NavLink>
            <NavLink className={`w-1/4`} href='/nearby'>
                Nearby
            </NavLink>
            <NavLink className={`w-1/4 `} href='/explore'>
                Explore
            </NavLink>
            <UserNav className={`w-full`} session={session} providers={providers} />
        </div >
    )
}