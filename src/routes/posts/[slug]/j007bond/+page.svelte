<script>
    let {data} = $props(); // The data object loaded in +page.js
    let post = data.post;
    // Bind form fields to post data with fallbacks for safety
    let title = $state(post?.title || '');
    let img = $state(post?.image || '');
    let postBody = $state(post?.postBody || '');
    let tag = $state(post?.tag || '');
    let featured = $state(post?.featured || false); // Boolean for checkbox
</script>

<style>
    form {
        margin: 5rem auto;
        }
    
    label {
        font-weight: 600;
        margin: 1rem 0;
    }
</style>


<form method="POST" class="row g-3 p-5 mx-5 shadow-lg">
    <h1 class="h3 my-3 text-center">Create Post</h1>
    <div class="col-md-6">
      <label for="title" class="form-label">Title</label>
      <input type="textas" name="title" class="form-control" id="title" required value={title}>
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
      <label for="ImgSrc" class="form-label">Tag</label>
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
    <div class="col-12">
      <button type="submit" class="btn btn-primary px-5 py-2 fw-medium d-block mx-auto">Update</button>
    </div>
  </form>
