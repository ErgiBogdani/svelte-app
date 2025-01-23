/** @satisfies {import('./$types').Actions} */
import fs from 'fs/promises';
import path from 'path';

export const actions = {
	default: async ({request}) => {
		const data = await request.formData()
		let title = data.get('title')
		let img = data.get('img')
		let postBody = data.get('postBody').replace(/\r\n/g, '<br>')
		let tag = data.get('tag') == "" ? 'untaged' : data.get('tag')
		let featured = data.has('featured')

		let post = {
			title,
			image:img,
			postBody,
			featured: featured ? 1 : 0,
			tag,
			date: new Date().toISOString(),
		}

		try {
			// Define the path to the JSON file
			const filePath = path.resolve('src/lib/data/posts.json');
	  
			// Read the existing JSON file
			const fileData = await fs.readFile(filePath, 'utf-8');
			const posts = JSON.parse(fileData);
	  
			// Add the new post to the array
			posts.push(post);
	  
			// Write the updated array back to the file
			await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
	  
			return { success: true, message: 'Post added successfully!' };
		  } catch (error) {
			console.error('Error writing to posts.json:', error);
			return { success: false, message: 'Failed to add post.' };
		  }
	}
};