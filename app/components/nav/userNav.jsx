'use client'
import SigninButton from "./signinButton";
import SignoutButton from "./signoutButton";
import { useState, useEffect, useRef, forwardRef } from "react";
import { useRouter } from "next/navigation";

const DropdownMenu = ({ children }) => {
    return (
        <div className="fixed top-14 right-0 rounded-bl-xl p-4 bg-slate-800 w-[30%] max-w-[250px] min-w-[200px]">
            {children}
        </div>
    )
};

export default function UserNav({ session, providers }) {
    const [toggle, setToggle] = useState(false);
    const router = useRouter();
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
        return <SignoutButton />;
    }

    return (
        <div ref={dropdownRef} className="w-fulll h-full">
            <button className="hover:bg-slate-700 p-4 flex flex-row h-full w-full items-center justify-center select-none" onClick={() => setToggle(!toggle)}>
                Sign in
            </button>
            {toggle && (
                <DropdownMenu >
                    <div className="flex flex-row items-center content-center justify-center select-none">
                        <SigninButton provider={providers.google} />
                    </div>
                    <div className="fixed top-14 w-[50px] right-[calc(max(30%,200px))] bg-transparent rounded-tr-xl shadow-slate-800 shadow-[25px_0px_0px_0px]">
                        &nbsp;
                    </div>
                </DropdownMenu>
            )}
        </div>
    );
}
