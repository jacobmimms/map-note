import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { authOptions } from "@/lib/auth"
import NavLink from './navLink'
import UserNav from "./userNav"

export default async function Nav() {
    const session = await getServerSession(authOptions)
    const providers = await getProviders()

    return (
        <div className="flex flex-row border-slate-800 border-b-2">
            <NavLink href='/nearby'>
                Nearby
            </NavLink>
            <NavLink href='/explore'>
                Explore
            </NavLink>
            <div className="w-full h-full flex flex-row content-center items-center">
                <UserNav session={session} providers={providers} />
            </div>
        </div >
    )
}