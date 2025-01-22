import fs from 'fs/promises';
import path from 'path';

const postsFilePath = path.resolve('src/lib/data/posts.json');

export async function load({ params }) {
    const { slug } = params; // Extract the slug from the route parameters
    const posts = JSON.parse(await fs.readFile(postsFilePath, 'utf-8'));
    const post = posts.find((p) => 
        p.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-') === slug
    );

    if (post) {
        return { post };
    } else {
        throw new Error('Post not found');
    }
}