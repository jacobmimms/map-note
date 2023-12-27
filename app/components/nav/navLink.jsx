'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function NavLink(props) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href) && props.href.startsWith(pathname)

    let className = isActive ? `rounded-t-xl bg-slate-800 text-slate-400 border-stone-500 h-[80%]` : `h-full text-slate-100`
    let size = `0px`
    return (
        <div className='flex flex-row items-end w-full h-full'>
            {isActive && <div className={`relative right-0 w-[${size}] h-[${size}] rounded-br-full bg-stone-500 shadow-[2px_2px_0px_2px_rgb(30,41,59)]`}>
                &nbsp;
            </div>}
            <Link {...props} className={`${className} ${props.className} w-full relative`}>

                <div className='flex flex-row justify-center items-center w-full h-full'>
                    {props.children}
                </div>
            </Link>
            {isActive && <div className={`relative right-0 w-[${size}] h-[${size}] rounded-bl-full bg-stone-500 shadow-[-2px_2px_0px_2px_rgb(30,41,59)]`}>
                &nbsp;
            </div>}
        </div>

    )
}