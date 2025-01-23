<script>
	let { data } = $props();
    import posts from '$lib/data/posts.json'

    let post = posts.find(post => post.title.toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '-') == data.params.slug)
</script>

<style>
    img{
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
</style>

{#if post != null}

<div style="max-width: 720px; margin-left: auto; margin-right: auto;">
    <a href="/posts" class="d-block fw-medium">Back to posts</a>

    <img class="my-3" src={post.image} alt="blog">

    <div class="fw-medium text-secondary">{new Date(post.date).toLocaleDateString('en-UK')}</div>

    <h1 class="mb-4 mt-1">{post.title}</h1>

    <p class="my-4">{@html post.postBody}</p>
</div>
    

{/if}
{#if post == null}
<h1>POST NOT FOUND!</h1>
{/if}