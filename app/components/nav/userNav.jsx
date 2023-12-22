'use client'
import SigninButton from "./signinButton"
import SignoutButton from "./signoutButton"
import { useState, useEffect } from "react"

export default function UserNav({ session, providers }) {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
    }, [toggle]);

    if (session) {
        return <SignoutButton />;
    }
    return (

        <>
            <button className={`flex flex-row h-full w-full items-center justify-center select-none`} onClick={() => setToggle(!toggle)}>
                Sign in
            </button>
            {toggle &&
                <>
                    <div className="fixed top-14 right-0 rounded-bl-xl p-4 bg-slate-800 w-[30%] max-w-[250px] min-w-[200px]">
                        <div className="flex flex-row items-center content-center justify-center select-none">
                            <SigninButton provider={providers.google} />
                        </div>
                        <div className="fixed top-14 w-[50px] right-[calc(min(30%,250px))] bg-transparent rounded-tr-xl shadow-slate-800 shadow-[25px_0px_0px_0px]">
                            &nbsp;
                        </div>
                    </div >

                </>
            }
        </>
    )
}