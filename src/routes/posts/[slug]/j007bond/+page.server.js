import fs from 'fs/promises';
import path from 'path';
import { redirect } from '@sveltejs/kit';

const postsFilePath = path.resolve('src/lib/data/posts.json');
let oPost;

export async function load({ params }) {
    const { slug } = params; 
    const posts = JSON.parse(await fs.readFile(postsFilePath, 'utf-8'));
    const post = posts.find((p) => 
        p.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-') === slug
    );
    oPost = post.title
    if (post) {
        return { post };
    } else {
        throw new Error('Post not found');
    }
}

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		let title = data.get('title');
		let img = data.get('img');
		let postBody = data.get('postBody').replace(/\r\n/g, '<br>');
		let tag = data.get('tag') === "" ? 'untagged' : data.get('tag');
		let featured = data.has('featured'); // Check if the checkbox is checked

		let updatedPost = {
			title,
			image: img,
			postBody,
			featured: featured ? 1 : 0,
			tag,
		};

        const slug = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');

		try {
			const filePath = path.resolve('src/lib/data/posts.json');
	  
			const fileData = await fs.readFile(filePath, 'utf-8');
			const posts = JSON.parse(fileData);

			// Find the index of the existing post using the slug
			const postIndex = posts.findIndex(
				(post) => post.title === oPost
			);

			if (postIndex !== -1) {
				posts[postIndex] = { ...posts[postIndex], ...updatedPost };
				
				await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
				
			} else {
				return { success: false, message: 'Post not found!' };
			}
		} catch (error) {
			console.error('Error updating post:', error);
			return { success: false, message: 'Failed to update post.' };
		}
        throw redirect(303, `/posts/${slug}`);
	},

    delete: async ({ request }) => {
        try {
            const filePath = path.resolve('src/lib/data/posts.json');
            const fileData = await fs.readFile(filePath, 'utf-8');
            const posts = JSON.parse(fileData);

            const updatedPosts = posts.filter((post) => post.title !== oPost);

            await fs.writeFile(filePath, JSON.stringify(updatedPosts, null, 2));
        } catch (error) {
            console.error('Error deleting post:', error);
            return { success: false, message: 'Failed to delete post.' };
        }
        throw redirect(303, `/`);
    },
};