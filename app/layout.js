import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Location Pics',
  description: 'A simple app to share pictures based on location',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en" className='w-full min-h-full h-full overflow-hidden'>
      <body className='h-full flex flex-col'>
        <Header />
        <section className='overflow-scroll h-full pt-[56px]  bg-slate-600'>
          {children}
        </section>
      </body>
    </html>
  )
}
