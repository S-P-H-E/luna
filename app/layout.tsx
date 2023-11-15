import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luna',
  description: 'The Best Simple AI Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
        appearance={{
          baseTheme: dark
        }}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
