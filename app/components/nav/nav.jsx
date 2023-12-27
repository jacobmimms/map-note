import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import { authOptions } from "@/lib/auth"
import NavLink from './navLink'
import UserNav from "./userNav"
import React from "react"

// function RowItems({ children }) {
//     const numChildren = React.Children.count(children)
//     const className = `w-1/${numChildren}`
//     if (numChildren === 0) {
//         return null
//     }
//     return (
//         <div className="flex flex-row border-slate-800 border-b-2 h-full">
//             {React.Children.map(children, (child) => (
//                 // append className to each child
//                 React.cloneElement(child, { className })

//             ))}
//         </div>
//     )
// }

export default async function Nav() {
    const session = await getServerSession(authOptions)
    const providers = await getProviders()

    return (
        <div className="flex flex-row  h-full w-full ml-8 ">
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