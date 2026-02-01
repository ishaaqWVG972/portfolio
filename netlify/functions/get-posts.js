const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.handler = async () => {
  try {
    const postsDir = path.join(__dirname, '../../content/blog');

    // Check if directory exists
    if (!fs.existsSync(postsDir)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify([])
      };
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(posts)
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load posts' })
    };
  }
};
