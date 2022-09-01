<script>
  import Error from '$lib/Error.svelte'
  import { signUp, signIn, signOut, getUser } from '$lib/services'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'

  // export let posts, error

  // redirect if not already logged in
  const user = getUser()
  if (browser && user) {
    console.log(user)
    goto('/')
  }
  async function handleSignout() {
    await signOut()
    goto('/login')
  }

  let loading = false
  let email
  let password

  async function handleLogin() {
    try {
      loading = true
      const { error } = await signIn({ email, password })
      if (error) throw error
      alert('Check your email!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading = false
    }
  }
</script>

<section class="h-screen">
  <div class="container px-6 py-12 h-full">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form on:submit|preventDefault={handleLogin}>
          <!-- Email input -->
          <div class="mb-6">
            <input
              type="email"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              bind:value={email}
            />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              bind:value={password}
            />
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-2"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            value={loading ? 'Loading' : 'Log in'}
            disabled={loading}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
