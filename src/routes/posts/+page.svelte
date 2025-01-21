<script>
    import Card from "$lib/Card.svelte";
    import posts from '$lib/data/posts.json'
</script>

<style>
    @media (max-width: 990px){
        .cont{
            justify-content: center !important;
        }
    }
</style>

<h1>All Posts</h1>
<br>

<div class="d-flex cont flex-row justify-content-between flex-wrap row-gap-5">
    {#each posts as post}
        <Card 
            img={post.image} 
            title={post.title} 
            text={post.postBody.split(" ").slice(0, 20).join(" ") + "..."} 
            tag={post.tag}
            date={post.date}
            >
        </Card>
    {/each}
</div>

