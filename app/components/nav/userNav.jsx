"use client";
import SigninButton from "./signinButton";
import SignoutButton from "./signoutButton";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

function DropdownMenu({ children, className }) {
  return (
    <div
      className={`absolute rounded-l-xl px-2 py-2 bg-slate-800 border-slate-700 border-y-4 border-x-4 w-[300%] sm:w-[100%] transition-transform duration-300 ${className} shadow-bottom-left shadow-md`}
    >
      {children}
    </div>
  );
}

function DropdownContent({ session }) {
  if (session) {
    return (
      <div className="flex flex-col gap-2 items-center content-center justify-center select-none w-full h-full">
        <Link
          href={`/user/${session.user.email}`}
          className="bg-slate-700 rounded-md p-2 flex flex-row h-full w-full items-center justify-center select-none"
        >
          Profile
        </Link>
        <SignoutButton />
      </div>
    );
  } else {
    return (
      <div className="flex flex-cols items-center content-center justify-center select-none w-full h-full">
        <SigninButton />
      </div>
    );
  }
}

export default function UserNav({ className }) {
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  const dropdownClass = toggle
    ? " sm:translate-x-0  -translate-x-[66.666666666%]"
    : "translate-x-full";

  return (
    <div
      ref={dropdownRef}
      className={` ${className} relative select-none h-full z-20`}
    >
      {session ? (
        <div
          className="flex flex-row items-center justify-center hover:cursor-pointer w-full h-full text-xl"
          onClick={() => setToggle(!toggle)}
        >
          {"{"}&nbsp;
          <Image
            width={50}
            height={50}
            alt="User Image"
            src={session.user.image}
            className="rounded-full border-2 border-slate-700"
          />
          &nbsp;{"}"}
        </div>
      ) : (
        <button className="w-full h-full" onClick={() => setToggle(!toggle)}>
          <div className="flex flex-col h-[60%] justify-center items-center rounded-xl bg-slate-800 mx-4">
            Sign in
          </div>
        </button>
      )}
      <DropdownMenu className={`${dropdownClass}`} toggle={toggle}>
        <DropdownContent session={session} />
      </DropdownMenu>
    </div>
  );
}
