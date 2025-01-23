<script>
    export let img;
    export let title;
    export let text;
    export let tag;
    export let date;

    let link = "/posts/" + title.toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '-')
</script>

<style>
    img{
        height: 250px;
        object-fit:cover;
    }

    .tag {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background-color: #000000bd;
        color: #fff;
        padding: 10px 1rem;
        font-size: 0.8rem;
        font-weight: 700;
    }

    @media (max-width: 1000px){
        img{
            height: 100%;
        }
    }
    @media (max-width: 768px){
        img{
            height: 300px;
        }
    }
</style>


<a class="text-decoration-none w-100 d-block" href={link}>
    <div class="card shadow w-100" >
        <span class="tag">{tag}</span>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={img} class="w-100 rounded-start" style="" alt="blog">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title my-3">{title}</h5>
              <p class="card-text">{text.replace(new RegExp("<br>", "g"), " ").split(" ").slice(0, 50).join(" ") + "..."} </p>
              <p class="card-text"><small class="text-secondary-emphasis fw-semibold">{new Date(date).toLocaleDateString('en-UK')}</small></p>
            </div>
          </div>
        </div>
      </div>
</a>