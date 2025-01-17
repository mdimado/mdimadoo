import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { mangle } from 'marked-mangle'

const postsDirectory = path.join(process.cwd(), 'blogs')

// Configure marked options
marked.use(gfmHeadingId())
marked.use(mangle())
marked.use({
    gfm: true,
    breaks: true,
    headerIds: true,
    renderer: {
      heading(text, level) {
        // Ensure valid heading text
        if (!text || typeof text !== 'string' || text.trim() === '') {
          console.warn('Invalid heading text:', text); // Log invalid text for debugging
          text = 'Untitled'; // Fallback to a default heading text
        }
        
        // Ensure valid id attribute
        const escapedText = text
          .toLowerCase()
          .replace(/[^\w]+/g, '-')
          .trim(); // Ensure no empty strings or undefined are used
  
        // If the escaped text is empty, fallback to "untitled" as the id
        const id = escapedText.length > 0 ? escapedText : 'untitled';
  
        return `
          <h${level} id="${id}" class="scroll-mt-16">
            ${text}
          </h${level}>
        `;
      },
      link(href, title, text) {
        return `<a href="${href}" title="${title || ''}" class="text-blue-600 hover:underline">${text}</a>`;
      },
      list(body, ordered) {
        const type = ordered ? 'ol' : 'ul';
        return `<${type} class="list-decimal space-y-2">${body}</${type}>`;
      },
      listitem(text) {
        return `<li class="ml-4">${text}</li>`;
      },
      blockquote(quote) {
        return `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">${quote}</blockquote>`;
      },
      code(code, language) {
        return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto"><code class="language-${language}">${code}</code></pre>`;
      },
      image(href, title, text) {
        return `<img src="${href}" alt="${text}" title="${title || ''}" class="rounded-lg shadow-md my-4" />`;
      }
    }
  })
  
  

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
  
    // Debugging logs for content and HTML conversion
    console.log('Extracted content:', content); // Check raw content
    const htmlContent = marked(content)
    console.log('HTML content:', htmlContent); // Check converted HTML
    
    return {
      frontmatter,
      content: htmlContent,
    }
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}
