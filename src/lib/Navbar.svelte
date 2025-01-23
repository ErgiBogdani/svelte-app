<script>
  import {page} from '$app/state';

  let slug = $derived(page.route.id)

  let isDarkMode = false;

  let code = $state('dark mode');
  let icon = $derived(code);
// Function to toggle the theme
const toggleTheme = () => {
  isDarkMode = !isDarkMode;
  code = isDarkMode ? 'light mode' : 'dark mode';
  document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : '');
};
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
      <div class="d-flex align-items-center">
        <a class="navbar-brand fw-medium fs-4" href="/">CIT Blog</a>
        <button class="btn btn-sm fw-medium btn-outline-secondary mt-1" onclick={toggleTheme}>{@html icon}</button>
      </div>

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