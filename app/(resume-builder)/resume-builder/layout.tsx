import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css';
import SessionWrapper from '@/app/providers/SessionProvider';


export const metadata = {
  title: 'Resume Builder',
  description: 'Resume buidler ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>{children}</body>
      </SessionWrapper>
    </html>
  )
}
