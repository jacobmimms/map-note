'use client'
import SigninButton from "./signinButton";
import SignoutButton from "./signoutButton";
import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation'

import Image from "next/image";
import Link from "next/link";

const DropdownMenu = ({ children, toggle }) => {
    const dropdownClass = toggle ? 'dropdown-entered' : 'dropdown-exiting';
    return (
        <div className={`absolute right-0 rounded-bl-xl p-4 bg-slate-800 w-[300%] sm:w-[100%]  ${dropdownClass}`}>
            {children}
        </div>
    );
};

function DropdownContent({ session, providers }) {
    if (session) {
        return (
            <>
                <Link href={`/user/${session.user.email}`} className="hover:bg-slate-700 p-4 flex flex-row h-full w-full items-center justify-center select-none">
                    Profile
                </Link>
                <SignoutButton />
            </>
        );
    } else {
        return (
            <div className="flex flex-row items-center content-center justify-center select-none w-full h-full">
                <SigninButton provider={providers.google} />
            </div>
        );
    }
}

export default function UserNav({ session, providers, ...props }) {
    const [toggle, setToggle] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname()
    useEffect(() => {
        // if pathname changes, close dropdown

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setToggle(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setToggle(false);
    }, [pathname]);

    return (
        <div ref={dropdownRef} className={`relative select-none ${props.className} h-full`}>
            {session ? (
                <div className="flex flex-row items-center justify-center  hover:cursor-pointer w-full h-full text-xl" onClick={() => setToggle(!toggle)} >
                    {'{'}&nbsp;
                    <Image width={50} height={50} alt='User Image' src={session.user.image} className="rounded-full border-2 border-slate-700" />
                    &nbsp;{'} '}
                </div>
            ) : (
                <button className="hover:bg-slate-700 p-4 flex flex-row h-full w-full items-center justify-center" onClick={() => setToggle(!toggle)}>
                    Sign in
                </button>
            )}
            <DropdownMenu toggle={toggle}>
                <DropdownContent session={session} providers={providers} />
            </DropdownMenu>
        </div>
    );
}
