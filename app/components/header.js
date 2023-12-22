import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from 'next/link'
import Image from "next/image"

export default async function Header() {
    const session = await getServerSession(authOptions)
    return (
        <div className='fixed top-0 flex-row items-center justify-between w-full'>
            <section className='w-full  bg-slate-800 flex flex-row items-center justify-between'>
                <h1 className='text-3xl font-bold text-slate-200 p-2'>
                    <a href='/' >
                        PICTURES!

                    </a>
                </h1>
                <a href='/explore' className='p-2 bg-slate-800 rounded-md m-2 hover:drop-shadow-lg '>
                    Explore
                </a>
                {
                    session ?
                        // <div className="h-full flex flex-row">
                        // <Image src={session.user.image} alt='user profile picture' width={50} height={50} className='rounded-full h-full' />
                        <Link href='/api/auth/signout' className='px-2 py-4 bg-slate-800  mx-2 h-full hover:bg-slate-600'>
                            Sign out
                        </Link>
                        // </div>

                        :
                        <Link href='/api/auth/signin' className='h-full px-2 py-4 bg-slate-800  mx-2 hover:bg-slate-600'>
                            Sign in
                        </Link>
                }
            </section>
        </div>
    )
}