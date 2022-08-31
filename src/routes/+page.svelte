<script>
    import CreatePost from '../lib/CreatePost.svelte'
    import Post from '../lib/Post.svelte'
    import { readable, get } from 'svelte/store'
    import supabase from '$lib/supabase'

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
</script>

<h1>Hello and welcome to my site!</h1>

<CreatePost />

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
