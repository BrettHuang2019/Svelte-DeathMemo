<script>
  import Error from '$lib/Error.svelte'
  import { signUp, signIn, signOut, getUser } from '$lib/services'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import Login from '../../lib/Login.svelte';
</script>

<Login/>
