'use client'

import Link from 'next/link'

export function BlogContent({ post }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1>{post.frontmatter.title}</h1>
        <div className="text-gray-500 mb-8">
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }} 
          className="mt-8"
        />
      </article>
    </div>
  )
}