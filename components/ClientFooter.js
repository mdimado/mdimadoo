'use client'

export function ClientFooter() {
  return (
    <footer className="bg-gray-50 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          © {new Date().getFullYear()} mdimado. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
