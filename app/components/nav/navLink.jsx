"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, className, children }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href) && href.startsWith(pathname);

  let activeClassName = isActive
    ? `rounded-t-xl bg-slate-800 text-slate-100 border-stone-500 h-[80%] nav-link-active`
    : `h-full text-slate-200`;
  return (
    <Link
      href={href}
      className={`${activeClassName} ${className} nav-link flex flex-row items-center justify-center w-full h-full relative`}
    >
      {children}
    </Link>
  );
}
