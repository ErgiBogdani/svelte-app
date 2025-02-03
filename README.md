## Overview

This Svelte application is a blog platform that allows users to browse posts by tags, view featured posts, and read recent posts. The application is built using SvelteKit and integrates Bootstrap for styling and responsive design.

## Table of Contents

1. Project Structure
2. File Descriptions
3. Components
4. Routes
5. Styling
6. Data Management
7. Bootstrap Integration

## Project Structure

```js
svelte-app/
├── .gitignore
├── .npmrc
├── .svelte-kit/
│   ├── ambient.d.ts
│   ├── generated/
│   │   ├── client/
│   │   ├── root.js
│   │   ├── root.svelte
│   │   └── server/
│   ├── non-ambient.d.ts
├── jsconfig.json
├── package.json
├── README.md
├── src/
│   ├── app.html
│   ├── css/
│   │   ├── bootstrap-grid.css
│   │   ├── bootstrap-grid.min.css
│   │   ├── bootstrap-grid.rtl.css
│   │   ├── bootstrap-grid.rtl.min.css
│   │   ├── bootstrap-reboot.css
│   │   ├── bootstrap-reboot.min.css
│   │   ├── bootstrap-reboot.rtl.css
│   │   ├── bootstrap-reboot.rtl.min.css
│   │   ├── bootstrap-utilities.css
│   ├── lib/
│   ├── routes/
│   │   ├── +page.svelte
│   │   ├── posts/
│   │   │   ├── +page.svelte
│   │   │   └── [slug]/
│   │   │       └── +page.svelte
│   ├── static/
│   │   ├── img/
│   │   ├── js/
│   │   │   ├── bootstrap.bundle.js
│   │   │   ├── bootstrap.bundle.min.js
│   │   │   ├── bootstrap.js
│   │   │   ├── bootstrap.min.js
│   │   │   ├── bootstrap.esm.js
│   │   │   ├── bootstrap.esm.min.js
├── svelte.config.js
├── tsconfig.json
└── vite.config.js
```


## File Descriptions

### package.json

Contains the project metadata and dependencies.

### svelte.config.js

Configuration file for SvelteKit.

### vite.config.js

Configuration file for Vite.

### app.html

The main HTML template for the app.

### posts.json

Contains the post data used in the application.

Collecting workspace information

Sure, here are code examples for the other sections:

## Components

### `Card.svelte`

```js
<script>
  export let img;
  export let title;
  export let text;
  export let tag;
  export let date;
</script>

<div class="card">
  <img src={img} class="card-img-top" alt={title} />
  <div class="card-body">
    <h5 class="card-title">{title}</h5>
    <p class="card-text">{text}</p>
    <p class="card-text"><small class="text-muted">{tag} - {date}</small></p>
  </div>
</div>

<style>
  .card {
    width: 18rem;
  }
</style>
```

### `HorizontalCard.svelte`

```js
<script>
  export let img;
  export let title;
  export let text;
  export let tag;
  export let date;
</script>

<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src={img} class="img-fluid rounded-start" alt={title} />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{text}</p>
        <p class="card-text"><small class="text-muted">{tag} - {date}</small></p>
      </div>
    </div>
  </div>
</div>
```

## Routes

### `/`

The home page displaying featured and recent posts.

```js
<script>
  import { onMount } from 'svelte';
  import HorizontalCard from '$lib/components/HorizontalCard.svelte';
  import posts from '$lib/data/posts.json';

  let featuredPosts = posts.filter(post => post.featured);
  let recentPosts = posts.slice(0, 5);
</script>

<div class="featured my-5">
  <h2 class="h3">Featured Posts</h2>
  <div class="d-flex flex-row justify-content-between flex-wrap row-gap-5 column-gap-5 my-5">
    {#each featuredPosts as post}
      <div class="featured-w">
        <HorizontalCard 
          img={post.image} 
          title={post.title} 
          text={post.postBody.split(" ").slice(0, 20).join(" ")} 
          tag={post.tag}
          date={post.date}
        />
      </div>
    {/each}
  </div>
</div>

<div class="recent my-5">
  <h2 class="h3">Recent Posts</h2>
  <div class="d-flex flex-row justify-content-between flex-wrap row-gap-5 column-gap-5 my-5">
    {#each recentPosts as post}
      <div class="recent-w">
        <HorizontalCard 
          img={post.image} 
          title={post.title} 
          text={post.postBody.split(" ").slice(0, 20).join(" ")} 
          tag={post.tag}
          date={post.date}
        />
      </div>
    {/each}
  </div>
</div>
```

### `/posts`

Displays all posts and allows browsing by tags.

```js
<script>
  import posts from '$lib/data/posts.json';
  import Card from '$lib/components/Card.svelte';

  let tags = Array.from(new Set(posts.map(post => post.tag)));
</script>

<h2>Browse by Tag</h2>
{#each tags as tag}
<div class="tag-section">
  <h3 class="py-3 h4 px-5 d-block text-center text-success mx-auto bg-success-subtle" style="width: fit-content; margin: 3rem 0">{tag.charAt(0).toUpperCase() + tag.slice(1)}</h3>
  <div class="d-flex flex-row justify-content-start flex-wrap row-gap-5 column-gap-4">
    {#each posts.filter(post => post.tag === tag) as post}
      <Card 
        img={post.image} 
        title={post.title} 
        text={post.postBody.split(" ").slice(0, 20).join(" ")} 
        tag={post.tag}
        date={post.date}
      />
    {/each}
  </div>
</div>
{/each}
```

### `/posts/[slug]`

Displays individual post details.

```js
<script context="module">
  export async function load({ params }) {
    const posts = await import('$lib/data/posts.json');
    const post = posts.default.find(p => p.slug === params.slug);
    return { props: { post } };
  }
</script>

<script>
  export let post;
</script>

<article>
  <h1>{post.title}</h1>
  <img src={post.image} alt={post.title} />
  <div innerHTML={post.postBody}></div>
  <p><strong>Tag:</strong> {post.tag}</p>
  <p><strong>Date:</strong> {post.date}</p>
</article>
```

## Secret Directory for Managing Posts

The application includes a secret directory that allows authorized users to create, update, or delete blog posts. This directory is intended for administrative purposes and is not accessible to regular users.

### Directory Structure

The secret directory is located at 

##### j007bond

 and contains the following files:

**+page.svelte**: The Svelte component for the form used to create or update posts. 

**+page.server.js**: The server-side logic for handling form submissions, including creating, updating, and deleting posts.

### Creating a Post

To create a new post, navigate to the secret directory and fill out the form with the post details, including the title, image source, post content, tag, and whether the post should be featured. Submit the form to add the new post to the blog.

### Updating a Post

To update an existing post, navigate to the secret directory and fill out the form with the updated post details. Submit the form to save the changes to the post.

### Deleting a Post

To delete a post, navigate to the secret directory and use the delete button in the form. This will remove the post from the blog.

### Example Code

#### +page.svelte

```js
<script>
    let {data} = $props(); 
    let post = data.post;

    let title = $state(post?.title || '');
    let img = $state(post?.image || '');
    let postBody = $state(post?.postBody || '');
    let tag = $state(post?.tag || '');
    let featured = $state(post?.featured || false); 
</script>

<style>
    form {
        margin: 5rem auto;
    }
    
    label {
        font-weight: 600;
        margin: 1rem 0;
    }

    @media (max-width: 568px) {
        form {
            margin: 0 !important;
            width: 100%;
            padding: 10px !important;
        }
    }
</style>

<form method="POST" action="?/update" class="row g-3 p-5 mx-5 shadow-lg">
    <h1 class="h3 my-3 text-center">Create Post</h1>
    <div class="col-md-6">
      <label for="title" class="form-label">Title</label>
      <input type="text" name="title" class="form-control" id="title" required value={title}>
    </div>
    <div class="col-6">
      <label for="ImgSrc" class="form-label">Image Source</label>
      <input type="text" name="img" class="form-control" id="ImgSrc" placeholder="https://" required value={img}>
    </div>
    <div class="col-12">
      <label for="PostBody" class="form-label">Post Content</label>
      <textarea type="text" name="postBody" class="form-control" id="PostBody" style="height: 15rem" required>{postBody}</textarea>
    </div>
    <div class="col-6">
      <label for="tag" class="form-label">Tag</label>
      <input type="text" name="tag" class="form-control" id="tag" placeholder="ex: travel" value={tag}>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" name="featured" value="" style="margin-top: 1.3rem" type="checkbox" id="gridCheck" checked={featured === 1}>
        <label class="form-check-label" for="gridCheck">
          Make post featured
        </label>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center column-gap-3 flex-wrap row-gap-3">
      <button class="btn btn-outline-danger px-5 py-2 fw-medium d-block" formaction="?/delete">Delete</button>
      <button type="submit" class="btn btn-success px-5 py-2 fw-medium d-block">Update</button>
    </div>
</form>
```

#### +page.server.js

```js
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
```

This secret directory provides a convenient way to manage blog posts directly within the application.

## Styling

The application uses Bootstrap for styling and responsive design. Bootstrap CSS files are located in the css directory.

## Data Management

Post data is stored in 

**posts.json**

and imported into Svelte components for rendering.

### Example of `posts.json`

```json
[
  {
    "title": "First Post",
    "image": "/img/first-post.jpg",
    "postBody": "This is the content of the first post.",
    "tag": "general",
    "featured": true,
    "date": "2023-01-01",
  },
  {
    "title": "Second Post",
    "image": "/img/second-post.jpg",
    "postBody": "This is the content of the second post.",
    "tag": "news",
    "featured": false,
    "date": "2023-02-01",
  }
]
```

## Bootstrap Integration

Bootstrap is integrated into the project for styling and responsive design. The Bootstrap JavaScript files are located in the `src/static/js` directory and included in the 

**app.html**

 file.

### Example of Including Bootstrap

```html
<!-- src/app.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Svelte App</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
  <div id="svelte">
    <script src="/js/bootstrap.bundle.min.js"></script>
  </div>
</body>
</html>
```

## Conclusion

This Svelte application provides a simple and efficient way to manage and display blog posts. By leveraging the power of **SvelteKit** for server-side rendering and routing, combined with the flexibility of **Bootstrap** for responsive and modern UI design, the app ensures a smooth and user-friendly experience across various devices. The integration of Svelte’s reactive components simplifies state management, making the app lightweight and performant.

With easy navigation, responsive layouts, and dynamic data fetching, this application forms a solid foundation for a blog. For further customization, developers can extend its functionality by adding features like user authentication, comments, or a rich text editor for posts.

As you continue to develop and refine the application, we recommend referring to the official **Svelte** and **Bootstrap** documentation for deeper insights and best practices. These resources will help you expand the app’s capabilities and tailor it to your specific needs.
