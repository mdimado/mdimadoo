// app/layout.js
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js',
}

function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            My Blog
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <div className="bg-gray-50 mt-8">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              © 2024 My Blog. All rights reserved.
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}