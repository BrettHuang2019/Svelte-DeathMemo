<script>
  import Error from '$lib/Error.svelte'
  import { signUp, signIn, signOut, getUser } from '$lib/services'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import SignUp from '$lib/SignUp.svelte';
</script>

<SignUp/>
