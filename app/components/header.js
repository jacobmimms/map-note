import Link from 'next/link'
import Nav from "@/app/components/nav/nav"

export default async function Header() {
    const HEADER_HEIGHT = 'h-[60px]'
    return (
        <>
            <div className={`flex min-${HEADER_HEIGHT} ${HEADER_HEIGHT} max-${HEADER_HEIGHT}`}>

                <div className={`fixed top-0 w-full z-10 min-${HEADER_HEIGHT} ${HEADER_HEIGHT} max-${HEADER_HEIGHT}`}>
                    <section className='w-full h-full bg-slate-800 flex flex-row items-center justify-between '>
                        <h1 className='text-2xl md:text-3xl font-bold text-slate-200 p-2'>
                            <Link href='/' className="select-none">
                                Loc.Pics
                            </Link>
                        </h1>
                        <Nav />
                    </section>
                </div>

            </div>

        </>

    )
}