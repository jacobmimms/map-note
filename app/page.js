
import Link from 'next/link';
import Nearby from './components/nearby';
import { LocationProvider } from './hooks/location';
export default function Page() {
  return (
    <>
      <main>
        <section className='flex flex-row items-center justify-center w-full p-4'>
          <h1 className='text-3xl font-bold text-slate-800 bg-slate-400 hover:text-slate-400 hover:bg-slate-700 rounded-md p-2 hover:cursor-pointer'>
            <Link href='/explore'>
              Explore the map!
            </Link>
          </h1>

        </section>

        <section>
          <h2 className='text-xl'>
            Nearby Posts
          </h2>
          <LocationProvider>
            <Nearby />
          </LocationProvider>

        </section>
      </main>
    </>
  );
};