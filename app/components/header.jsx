import Link from 'next/link'
import Nav from "@/app/components/nav/nav"

export default async function Header() {
    const HEADER_HEIGHT = 'h-[60px]'
    return (
        <>
            <div className={`flex ${HEADER_HEIGHT} bg-stone-500`}>
                <div className={`fixed top-0 w-full z-10 ${HEADER_HEIGHT}`}>
                    <Nav />
                </div>
            </div>

        </>

    )
}