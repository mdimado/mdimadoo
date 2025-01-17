'use client'

import Link from 'next/link'

export function ClientNav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            mdimado
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
           
          </div>
        </div>
      </div>
    </nav>
  )
}