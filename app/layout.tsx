import type { Metadata, Viewport } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import ClientLayout from "./clientLayout"

// Load Rubik font with Hebrew and Latin subsets
const rubik = Rubik({ 
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-rubik'
})

export const metadata: Metadata = {
  title: 'Safety Management System',
  description: 'Comprehensive safety management solution',
  generator: 'v0.dev',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${rubik.variable} font-sans min-h-screen bg-gray-50 text-gray-900`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
