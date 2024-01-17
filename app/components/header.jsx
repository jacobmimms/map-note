import Nav from "@/app/components/nav/nav"

export default async function Header() {
    console.count('Header')
    const HEADER_HEIGHT = 'h-[60px]'
    
    // get session from server
        
    return (
        <div className={`${HEADER_HEIGHT} bg-stone-500`}>
            <Nav />
        </div>
    )
}