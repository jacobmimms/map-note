import { Noto_Sans } from 'next/font/google'

import './globals.css'
import Header from './components/header'
import SessionProvider from '@/app/providers/sessionProvider'
import { PostsProvider } from '@/app/providers/postsProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LocationProvider } from '@/app/providers/locationProvider';
import Head from 'next/head'


const noto = Noto_Sans({ subsets: ['latin'], variants: ['regular', 'bold'], weights: [400, 700] })

export const metadata = {
  title: 'Location Pics',
  description: 'A simple app to share pictures based on location',

}
export default async function RootLayout({ children }) {
  const { session } = getServerSession(authOptions)
  return (
    <html lang="en" className={`${noto.className} w-full bg-stone-500`}>
      <body className='flex flex-col'>
        <Header />

        <LocationProvider>
          <PostsProvider>
            <SessionProvider session={session}>
              <div className='bg-slate-800 h-[calc(100%-60px)] w-full rounded-tr-md rounded-tl-md'>
                <main className='h-[calc(100%-16px)] overflow-scroll  bg-transparent rounded-lg m-2'>
                  {children}
                </main>
              </div>
            </SessionProvider>
          </PostsProvider>
        </LocationProvider>

      </body>
    </html>
  )
}
