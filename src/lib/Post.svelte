<script>
    export let id, created_at, user, title, content
</script>


<article class="card w-96 bg-base-100 shadow-xl m-5">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{content}</p>
  </div>
</article>