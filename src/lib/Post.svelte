<script>
    export let id, created_at, user, title, content
</script>


<article class="card w-100% bg-base-100 shadow-lg mt-4 mx-4">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{content}</p>
  </div>
</article>