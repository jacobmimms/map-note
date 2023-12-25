import { Noto_Sans } from 'next/font/google'

import './globals.css'
import Header from './components/header'
import SessionProvider from '@/app/providers/sessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


const noto = Noto_Sans({ subsets: ['latin'], variants: ['regular', 'bold'], weights: [400, 700] })

export const metadata = {
  title: 'Location Pics',
  description: 'A simple app to share pictures based on location',
}

export default async function RootLayout({ children }) {
  const { session } = getServerSession(authOptions)
  return (
    <html lang="en" className={`${noto.className} w-full min-h-screen overflow-hidden`}>
      <body className='flex flex-col min-h-screen h-full'>
        <Header />
        <SessionProvider session={session}>
          <main className='h-[calc(100%-60px)] overflow-scroll  bg-slate-600'>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
