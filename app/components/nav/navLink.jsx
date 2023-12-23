'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink(props) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href)
    let className = isActive ? 'bg-slate-600 text-slate-950 cursor-default' : 'bg-slate-800 text-slate-200  hover:bg-slate-700'
    return (
        <Link  {...props} className={`${className} h-full py-4 px-4`}>
            <div className='h-full select-none'>
                {props.children}
            </div>
        </Link>
    )
}