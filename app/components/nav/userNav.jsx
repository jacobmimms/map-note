'use client'
import SigninButton from "./signinButton";
import SignoutButton from "./signoutButton";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const DropdownMenu = ({ children }) => {
    return (
        <div className="fixed top-15 right-0 rounded-bl-xl p-4 bg-slate-800 w-[30%] max-w-[250px] min-w-[200px]">
            {children}
        </div>
    )
};

export default function UserNav({ session, providers }) {
    const [toggle, setToggle] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setToggle(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    if (session) {
        return (
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div ref={dropdownRef} className="w-full h-full">
                    <Image alt='user Image' src={session?.user?.image} width={30} height={40} className="w-full h-full select-none rounded-3xl hover:cursor-pointer p-2" onClick={() => setToggle(!toggle)} />
                    {toggle && (
                        <DropdownMenu >
                            <Link href={`/user/${session?.user?.email}`} className="hover:bg-slate-700 p-4 flex flex-row h-full w-full items-center justify-center select-none">
                                Profile
                            </Link>
                            <SignoutButton />
                        </DropdownMenu>
                    )}
                </div>
            </div>

        )
    }

    return (
        <div ref={dropdownRef} className="w-full h-full">
            <button className="hover:bg-slate-700 p-4 flex flex-row h-full w-full items-center justify-center select-none" onClick={() => setToggle(!toggle)}>
                Sign in
            </button>
            {toggle && (
                <DropdownMenu >
                    <div className="flex flex-row items-center content-center justify-center select-none w-full h-full">
                        <SigninButton provider={providers.google} />
                    </div>
                    {/* <div className="fixed top-14 w-[50px] right-[calc(max(30%,250px))] bg-transparent rounded-tr-xl shadow-slate-800 shadow-[25px_0px_0px_0px]">
                        &nbsp;
                    </div> */}
                </DropdownMenu>
            )}
        </div>
    );
}
