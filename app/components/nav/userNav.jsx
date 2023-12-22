'use client'
import SigninButton from "./signinButton"
import SignoutButton from "./signoutButton"
import { useState } from "react"

export default function UserNav({ session, providers }) {
    const [toggle, setToggle] = useState(false)
    if (session) {
        return (
            <SignoutButton />
        )
    }
    return (

        <>
            <button className={`flex flex-row h-full w-full items-center justify-center `} onClick={() => setToggle(!toggle)}>
                Sign in
            </button>
            {toggle &&
                <div className="fixed top-14 right-0 rounded-bl-xl p-4 border-t-2  border-slate-700 shadow-slate-700  bg-slate-800 w-[30%] z-10 shadow-2xl">
                    <div className="flex flex-row w-full h-full items-center justify-center">
                        <SigninButton provider={providers.google} />
                    </div>
                </div >
            }
        </>
    )
}