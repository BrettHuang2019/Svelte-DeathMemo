<script>
  import Post from './Post.svelte'
  import { fly } from 'svelte/transition'

  export let columnType
  export let columnColor
  export let title
  export let posts
</script>

<div class="w-1/3 h-auto min-h-screen {columnColor} flex flex-col rounded-xl">
  <p class="text-white text-3xl mx-auto mt-5 card-title">{title}</p>
  {#if posts}
    {#each posts as post, index}
    <div 
      in:fly={{ delay: (index + 1) * 50, x: -100 }}
      out:fly={{ x: -100 }}>
      <Post {...post} columnType={columnType} />
    </div>
    {/each}
  {:else}
  <p class="text-white text-xl mx-auto mt-5">
    Loading...
  </p>
  {/if}
  <div class="h-10" />
</div>
