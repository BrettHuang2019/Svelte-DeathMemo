<script>
    import Error from '$lib/Error.svelte'
    import { signOut, getUser } from '$lib/services'
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'

    // export let posts, error

    // redirect if not already logged in
    const user = getUser()
    if (browser && user) goto('/')

    async function handleSignout() {
        await signOut()
        goto('/login')
    }

    async function handleLogin() {
        
    }
</script>

<div class="form-control" on:submit|preventDefault={()=>handleLogin()}>
    <label class="label">
        <span class="label-text">Login</span>
    </label>
    <label class="input-group">
        <span>Email</span>
        <input
            type="text"
            placeholder="info@site.com"
            class="input input-bordered"
        />
    </label>
        <label class="input-group">
        <span>Password</span>
        <input
            type="password"
            class="input input-bordered"
        />
    </label>
    <button class="btn btn-primary">Login</button>
</div>
