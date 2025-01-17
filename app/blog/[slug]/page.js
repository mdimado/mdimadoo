// app/blog/[slug]/page.js
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <article className="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1>{post.frontmatter.title}</h1>
        <div className="text-gray-500 mb-8">
          {formatDate(post.frontmatter.date)}
        </div>
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="mt-8"
        />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}