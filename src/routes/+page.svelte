<script>
    import posts from '$lib/data/posts.json'
    import Card from '$lib/Card.svelte'
    import HorizontalCard from '$lib/HorizontalCard.svelte';

    const featuredPosts = posts.filter(post => post.featured === 1);
    const recentPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
</script>

<style>
    .carousel-item{
        height: 550px;
        background-size: cover;
        background-position: center;
    }
    #c-img-1{
        background-image: linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url('https://images.pexels.com/photos/1574184/pexels-photo-1574184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    }
    #c-img-2{
        background-image: linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url('https://images.pexels.com/photos/630786/pexels-photo-630786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    }
    #c-img-3{
        background-image: linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url('https://images.pexels.com/photos/30332024/pexels-photo-30332024/free-photo-of-serene-winter-landscape-with-snowy-cabin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    }
    .featured-w{
        width: 48%;
    }
    @media (max-width: 1400px){
        .featured-w{
            width: 45%;
        }
    }
    @media (max-width: 1200px){
        .featured-w{
            width: 100%;
        }
    }
</style>

<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div id="c-img-1" class="carousel-item active">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div id="c-img-2" class="carousel-item">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div id="c-img-3" class="carousel-item">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="featured my-5">
    <h2 class="h3">Featured Posts</h2>
    <div class="d-flex flex-row justify-content-center flex-wrap row-gap-5 column-gap-5 my-5">
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

    <div class="recent my-5">
        <h2 class="h3">Recent Posts</h2>
        <div class="d-flex flex-column align-items-center flex-wrap row-gap-5 column-gap-5 my-5">
            {#each recentPosts as post}
            <HorizontalCard 
            img={post.image} 
            title={post.title} 
            text={post.postBody} 
            tag={post.tag}
            date={post.date}
            />
            {/each}
        </div>
    </div>
  </div>
  