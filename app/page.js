import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostList'
import './globals.css'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-8 text-center">You git clone this blog? Hope you’re ready for a lot of unmerged conflicts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}