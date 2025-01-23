<script>
    import Card from "$lib/Card.svelte";
    import posts from '$lib/data/posts.json'

    let tags = Array.from(new Set(posts.map(post => post.tag)));
</script>

<svelte:head>
  <title>Posts | CIT Blog</title>
</svelte:head>


<style>
    .proper-flex {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-between;
        row-gap: 3rem;
        }
    @media (max-width: 1399px){
        .proper-flex::after {
            display: none;
            }
        .proper-flex {
        display: grid;
        grid-template-columns: auto auto;
        justify-content: center;
        column-gap: 3rem;
        }
        }
    @media (max-width: 991px){
        .proper-flex{
            grid-template-columns: auto;
        }

    }
</style>

<h2>Browse by Tag</h2>
{#each tags as tag}
<div class="tag-section">
  <h3 class="py-3 h4 px-5 d-block text-center text-success mx-auto bg-success-subtle" style="width: fit-content; margin: 3rem 0">{tag.charAt(0).toUpperCase() + tag.slice(1)}</h3>
  <div class="proper-flex">
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

<div class="proper-flex">
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

