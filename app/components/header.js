export default function Header() {
    return (
        <div className='fixed top-0 flex-row items-center justify-between w-full'>
            <section className='w-full  bg-slate-800 flex flex-row items-center justify-between'>
                <h1 className='text-3xl font-bold text-white p-2'>
                    <a href='/' >
                        PICTURES!

                    </a>
                </h1>
                <a href='/explore' className='p-2 bg-slate-800 rounded-md m-2 hover:drop-shadow-lg '>
                    Explore
                </a>
            </section>
        </div>
    )
}