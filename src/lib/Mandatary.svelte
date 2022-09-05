<script>
  import { deleteMandate } from '$lib/services'
  
  export let id, mandatary, mandator, created_at;

</script>

<form class="w-96" on:submit|preventDefault={(deleteMandate(id))}>
  <div class="mb-2 flex gap-2 items-center align-center">
    <p class="text-yellow-300">{mandatary}</p>
    <button
      type="submit"
      class="inline-flex items-center px-2 text-2xl font-bold text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
    >
      -
    </button>
  </div>
</form>

