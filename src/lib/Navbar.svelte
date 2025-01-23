<script>
  import {page} from '$app/stores';

  let slug = $derived($page.route.id)
</script>

<style>
  nav {
    font-size: 1.02rem;
  }

  .nav-link {
    font-weight: 600;
  }
</style>

<nav class="navbar navbar-expand-lg bg-body-tertiary p-3 shadow-sm">
    <div class="container-md">
      <a class="navbar-brand fw-medium fs-4 pe-4" href="/">CIT Blog</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link {slug == "/" ? "active": ''}" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {slug == "/posts" ? "active": ''}" href="/posts">All Posts</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>