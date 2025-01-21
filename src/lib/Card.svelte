<script>
    export let img;
    export let title;
    export let text;
    export let tag;
    export let date;

    let link = "/posts/" + title.toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '-')
</script>

<style>
    .cont {
        width: 25rem;
    }
    .title-h {
        height: 3em;
        overflow: hidden;
    }
    .text-h {
        height: 5em;
        overflow: hidden;
    }
    img {
        height: 15rem;
        object-fit: cover;
    }
    .tag {
        position: absolute;
        top: 12rem;
        right: 1rem;
        background-color: #000000bd;
        color: #fff;
        padding: 10px 1rem;
        font-size: 0.8rem;
        font-weight: 700;
    }
    @media (max-width: 500px){
        .cont{
            width: 100% !important;
        }
    }
</style>

<a href={link} class="d-block text-decoration-none">
    <div class="card cont shadow">
        <span class="tag">{tag}</span>
        <img src={img} class="card-img-top" alt="blog">
        <div class="card-body">
        <p class="text-body-secondary fw-medium">{new Date(date).toLocaleDateString('en-UK')}</p>
          <h5 class="card-title title-h">{title}</h5>
          <p class="card-text text-h">
            {text}
            </p>
        </div>
      </div>
</a>
