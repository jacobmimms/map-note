import Link from 'next/link'
import Nav from "@/app/components/nav/nav"

export default async function Header() {
    const HEADER_HEIGHT = 'h-[60px]'
    return (
        <>
            <div className={`${HEADER_HEIGHT} bg-stone-500`}>
                <Nav />
            </div>
        </>

    )
}