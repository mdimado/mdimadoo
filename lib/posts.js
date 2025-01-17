// lib/posts.js
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const postsDirectory = path.join(process.cwd(), 'blogs')

export async function getAllPosts() {
  try {
    const files = fs.readdirSync(postsDirectory)
    
    const posts = files.map((filename) => {
      const slug = filename.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(
        path.join(postsDirectory, filename),
        'utf-8'
      )
      
      const { data: frontmatter, excerpt } = matter(markdownWithMeta, {
        excerpt: true,
      })

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: excerpt || frontmatter.excerpt || 'No excerpt available',
      }
    })

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContents)
    const htmlContent = marked(content)

    return {
      frontmatter,
      content: htmlContent,
    }
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}