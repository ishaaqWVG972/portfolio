import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    const postsDir = path.join(process.cwd(), 'content/blog');

    // Check if directory exists
    if (!fs.existsSync(postsDir)) {
      return res.status(200).json([]);
    }

    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

    const posts = files.map(file => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        image: data.image || null,
        body: content
      };
    });

    // Sort by date descending (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error loading posts:', error);
    res.status(500).json({ error: 'Failed to load posts' });
  }
}
