<script>
  import { mandatorStore, currentBoard } from '$lib/stores.js'
  export let id = undefined,
    mandatary = undefined,
    mandator = undefined,
    created_at = undefined
  export let closeExpand = () => {}

  function changeBoard() {
    currentBoard.set(mandator)
    closeExpand()
  }
</script>

<a
  href="#"
  class="block px-4 py-2 text-sm text-white bg-amber-500 hover:bg-amber-600"
  role="menuitem"
  tabindex="-1"
  on:click={changeBoard}>{mandator}</a
>
