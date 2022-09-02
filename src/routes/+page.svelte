<script>
    import CreatePost from '../lib/CreatePost.svelte'
    import Post from '../lib/Post.svelte'
    import { readable, get } from 'svelte/store'
    import supabase from '$lib/supabase'
    import {getUser} from '$lib/services'
    import SignUp from '../lib/SignUp.svelte';
    import Login from '../lib/Login.svelte';
    import {currentEmail, isOverlayOpen} from '$lib/stores.js'
    import Overlay from '../lib/Overlay.svelte';
    

    // export let data;
    const posts = readable(null, (set) => {
        supabase
            .from('posts')
            .select('*')
            .then(({ data, error }) => set(data))

        // Add realtime subscription
        const subscription = supabase
            .from('posts')
            .on('*', (payload) => {
                if (payload.eventType === 'INSERT') {
                    set([...get(posts), payload.new])
                }
            })
            .subscribe()

        return ()=> supabase.removeSubscription(subscription);
    })

    // currentEmail.set(getUser().email);
</script>

<h1>Hello and welcome to my site!</h1>
<p>Welcome, {$currentEmail}</p>

<button class="btn" on:click={()=>{
    isOverlayOpen.set(true);
}}>Create Post</button>

{#if $isOverlayOpen}
    <Overlay>
        <CreatePost />
    </Overlay>
{/if}

<!-- <Login /> -->

<!-- <SignUp /> -->

<!-- {#each data.data as post}
    <Post {...post} />
{/each} -->

{#if $posts}
    {#each $posts as post}
        <Post {...post} />
    {/each}
{:else}
    Loading...
{/if}
