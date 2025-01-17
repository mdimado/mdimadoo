import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <p className="text-sm text-gray-500">
            {formatDate(post.date)}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
