import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from "./clientLayout"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Safety Management System',
  description: 'Comprehensive safety management solution',
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
