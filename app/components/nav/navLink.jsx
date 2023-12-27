'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink(props) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href)
    console.log(props)
    let className = isActive ? 'bg-slate-600 text-slate-950 cursor-default' : 'bg-slate-800 text-slate-200  hover:bg-slate-700'
    return (
        <Link  {...props} className={`${className} ${props.className} h-full`}>
            <div className='h-full w-full select-none flex flex-col items-center justify-center'>
                {props.children}
            </div>
        </Link>
    )
}