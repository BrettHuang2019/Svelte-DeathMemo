<script>
  import { mandatorStore, currentBoard } from '$lib/stores.js'
  export let id, mandatary, mandator, created_at
  export let closeExpand = ()=>{}

  function changeBoard(){
    currentBoard.set(mandator)
    closeExpand()
  }
</script>

<a
  href="#"
  class="text-gray-700 block px-4 py-2 text-sm"
  role="menuitem"
  tabindex="-1"
  on:click={changeBoard}>{mandator}</a
>
