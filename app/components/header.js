// 'use client'
import Image from 'next/image'
import { auth } from "../../auth";


export default async function Header() {
    const session = await auth()
    console.log(session, "session")
    return (
        <div className='fixed top-0 flex-row items-center justify-between w-full'>
            <section className='w-full  bg-slate-800 flex flex-row items-center justify-between'>
                <h1 className='text-3xl font-bold text-slate-200 p-2'>
                    <a href='/' >
                        PICTURES!

                    </a>
                </h1>
                <div className='flex flex-row'>
                    <a href='/explore' className='p-2 bg-slate-800 rounded-md m-2 hover:drop-shadow-lg '>
                        Explore
                    </a>
                    {session && <Image src={session?.user?.image} className='rounded-full m-2' alt={'user image'} width={40} height={40}></Image>}
                </div>
            </section>
        </div>
    )
}