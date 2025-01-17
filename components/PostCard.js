'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PostCard({ post }) {
  return (
    <div className="h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl">{post.title}</CardTitle>
            <div className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{post.excerpt}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}