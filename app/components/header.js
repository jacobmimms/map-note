import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from 'next/link'
import Image from 'next/image';
import Nav from "@/app/components/nav/nav"

export default async function Header() {
    const session = await getServerSession(authOptions)
    return (
        <div className='fixed top-0 w-full z-10'>

            <section className='w-full  bg-slate-800 flex flex-row items-center justify-between '>

                <h1 className='text-2xl md:text-3xl font-bold text-slate-200 p-2'>
                    <Link href='/' className="select-none">
                        Loc.Pics
                        {/* <Image className="rounded-full" src='/locpics.png' width={40} height={40}>
                        </Image> */}
                    </Link>


                </h1>
                <Nav />
            </section>

        </div>
    )
}