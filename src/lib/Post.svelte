<script>
  import { deletePost } from '$lib/services'
  import { currentEmail, currentBoard } from '$lib/stores.js'

  export let id, created_at, user, title, content, type, columnType
</script>

{#if columnType === type}
  <article class="card w-100% bg-base-100 shadow-lg mt-4 mx-4">
    <div class="card-body">
      {#if $currentEmail === $currentBoard}
        <button
          class="absolute top-1 right-3 text-4xl text-gray-300 hover:-translate-y-0.5 transition-transform"
          on:click={() => {
            deletePost(id)
          }}>&times;</button
        >
      {/if}

      <h2 class="card-title">{title}</h2>
      <p>{content}</p>
    </div>
  </article>
{/if}
