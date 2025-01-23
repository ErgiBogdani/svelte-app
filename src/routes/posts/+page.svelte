<script>
    import Card from "$lib/Card.svelte";
    import posts from '$lib/data/posts.json'

    let tags = Array.from(new Set(posts.map(post => post.tag)));
</script>

<style>
    @media (max-width: 990px){
        .cont{
            justify-content: center !important;
        }
    }
</style>

<h2>Brose by Tag</h2>
{#each tags as tag}
<div class="tag-section">
  <h3 class="py-3 h4 px-5 d-block text-center text-success mx-auto bg-success-subtle" style="width: fit-content; margin: 3rem 0">{tag.charAt(0).toUpperCase() + tag.slice(1)}</h3>
  <div class="d-flex flex-row justify-content-start flex-wrap row-gap-5 column-gap-4">
    {#each posts.filter(post => post.tag === tag) as post}
      <Card 
      img={post.image} 
      title={post.title} 
      text={post.postBody.replace("<br><br>", " ").split(" ").slice(0, 20).join(" ") + "..."} 
      tag={post.tag}
      date={post.date}
      />
    {/each}
  </div>
</div>
{/each}

<h1 class="mt-5 pt-5">All Posts</h1>
<br>

<div class="d-flex cont flex-row justify-content-between flex-wrap row-gap-5">
    {#each posts as post}
        <Card 
            img={post.image} 
            title={post.title} 
            text={post.postBody.replace("<br><br>", " ").split(" ").slice(0, 20).join(" ") + "..."} 
            tag={post.tag}
            date={post.date}
            >
        </Card>
    {/each}
</div>

