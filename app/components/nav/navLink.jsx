'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function NavLink(props) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href) && props.href.startsWith(pathname)

    let className = isActive ? `rounded-t-xl bg-slate-800 text-slate-400 border-stone-500 h-[80%] nav-link-active` : `h-full text-slate-100`
    return (
        <div className='nav-link flex flex-row items-end w-full h-full'>
            <Link {...props} className={`${className} ${props.className} w-full relative`}>

                <div className='flex flex-row justify-center items-center w-full h-full'>
                    {props.children}
                </div>
            </Link>
        </div>

    )
}