'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink(props) {
    const pathname = usePathname()
    // if href begins with pathname, then it is active
    const isActive = pathname.startsWith(props.href)
    let className = isActive ? 'bg-slate-600 text-slate-950' : 'bg-slate-800 text-slate-200'
    return (
        <Link  {...props} className={`${className} h-full py-4 px-4`}>
            <div className='h-full'>
                {props.children}
            </div>
        </Link>
    )
}