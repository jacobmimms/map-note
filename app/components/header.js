import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from 'next/link'
import Nav from "@/app/components/nav/nav"

export default async function Header() {
    const session = await getServerSession(authOptions)
    return (
        <div className='fixed top-0 w-full'>

            <section className='w-full  bg-slate-800 flex flex-row items-center justify-between'>
                <h1 className='text-xl md:text-3xl font-bold text-slate-200 p-2'>
                    <Link href='/' >
                        PICTURES!
                    </Link>
                </h1>
                <Nav />
            </section>

        </div>
    )
}