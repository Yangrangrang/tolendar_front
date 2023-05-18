import Header from './Header'
import { UserContextProvider } from './context/userContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
        children,
    }: {
        children: React.ReactNode
    }) {

    return (
        <html lang="ko">
        <body className={inter.className}>
            <div className='h-screen relative '>
                <div className='container sm w-2/5 min-w-[60%] h-[830px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <UserContextProvider>
                    <Header />
                    {children}
                    </UserContextProvider>
                </div>
            </div>
        </body>
        </html>
    )
}
