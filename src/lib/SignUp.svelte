<script>
  import Error from '$lib/Error.svelte'
  import { signUp, signOut, getUser } from '$lib/services'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { fade } from 'svelte/transition'

  // export let posts, error

  // redirect if not already logged in
  const user = getUser()
  if (browser && user) {
    console.log(user)
    goto('/')
  }

  let loading = false
  let email
  let password1, password2
  let pwdMismatchError = false
  const error = { message: 'Password mismatch' }

  async function handleSignUp() {
    if (password1 != password2) {
      pwdMismatchError = true
      await new Promise((resolve) => setTimeout(resolve, 2000))
      pwdMismatchError = false
      return
    }

    try {
      loading = true
      const { error } = await signUp({ email, password: password1 })
      if (error) {
        throw error
        alert('Check your email!')
      }
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading = false
      goto('/')
    }
  }
</script>

<section class="h-screen" transition:fade>
  <div class="container px-6 py-12 h-full">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form on:submit|preventDefault={handleSignUp}>
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
              bind:value={password1}
            />
          </div>

          <!-- Confirm Password input -->
          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm Password"
              bind:value={password2}
            />
          </div>

          {#if pwdMismatchError}
            <Error {error} />
          {/if}

          <!-- Submit button -->
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            value={loading ? 'Loading' : 'Sign Up'}
            disabled={loading}
          >
            Sign up
          </button>
        </form>

        <div class="text-sky-600 mt-1">
          <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  </div>
</section>
