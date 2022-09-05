<script>
  import CreatePost from '../lib/CreatePost.svelte'
  import CreateMandate from '$lib/CreateMandate.svelte'
  import { readable, get } from 'svelte/store'
  import supabase from '$lib/supabase'
  import { getUser, signOut, getMandator } from '$lib/services'
  import {
    currentEmail,
    isOverlayOpen,
    isCreatePostOpen,
    isCreateMandateOpen,
    mandataryStore,
    mandatorStore,
    currentBoard,
  } from '$lib/stores.js'
  import Overlay from '../lib/Overlay.svelte'
  import Column from '../lib/Column.svelte'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'

  let posts
  function fetchPosts(email) {
    if (unsubscrbe) {
      unsubscrbe()
    }

    posts = readable(null, (set) => {
      supabase
        .from('posts')
        .select('*')
        .eq('user', email)
        .then(({ data, error }) => set(data))

      // Add realtime subscription
      const subscription = supabase
        .from('posts')
        .on('INSERT', (payload) => {
          set([...get(posts), payload.new])
        })
        .on('DELETE', (payload) => {
          set([...get(posts).filter((p) => p.id !== payload.old.id)])
        })
        .subscribe()

      return () => supabase.removeSubscription(subscription)
    })
  }

  let mandataryArr
  function fetchMandatary() {
    mandataryArr = readable(null, (set) => {
      supabase
        .from('mandate')
        .select('*')
        .eq('mandator', getUser().email)
        .then(({ data, error }) => {
          set(data)
          mandataryStore.set(data)
        })

      // Add realtime subscription
      const subscription = supabase
        .from('mandate')
        .on('INSERT', (payload) => {
          set([...get(mandataryArr), payload.new])
          mandataryStore.set([...get(mandataryArr)])
        })
        .on('DELETE', (payload) => {
          set([...get(mandataryArr).filter((p) => p.id !== payload.old.id)])
          mandataryStore.set([...get(mandataryArr)])
        })
        .subscribe()
      return () => supabase.removeSubscription(subscription)
    })
  }

  async function fetchMadator() {
    const result = await getMandator()
    if (result.data) {
      mandatorStore.set([{mandator: user.email}, ...result.data])
    }
  }

  function clearPosts() {
    posts = readable(null, (set) => {})
  }

  function reloadBoard() {
    clearPosts()
    setTimeout(() => {
      if (user) {
        unsubscrbe = fetchPosts($currentBoard)
      }
    }, 1000)
  }

  const user = getUser()
  if (browser && !user) goto('/login')

  async function handleSignout() {
    await signOut()
    goto('/login')
  }

  let unsubscrbe
  setTimeout(() => {
    if (user) {
      unsubscrbe = fetchPosts(user.email)
      fetchMandatary()
      fetchMadator()
      currentEmail.set(user.email)
      getMandator()
      currentBoard.set(user.email)
    }
  }, 100)

  setTimeout(() => {
    if (user) {
      console.log($mandataryArr)
    }
  }, 1000)
</script>

<div
  class="container mb-5 px-4 flex flex-wrap justify-between items-center mx-auto"
>
  <div class="flex justify-center items-center gap-2">
    <p>Welcome, <span class="text-sky-800">{$currentEmail}</span></p>
    <button class="btn btn-secondary" on:click={handleSignout}>Sign out</button>
  </div>
  <div>
    {#if $currentEmail === $currentBoard}
      <button
        class="btn btn-primary"
        on:click={() => {
          isOverlayOpen.set(true)
          isCreatePostOpen.set(true)
        }}>Create Memo</button
      >
    {/if}

    <button
      class="btn btn-primary"
      on:click={() => {
        isOverlayOpen.set(true)
        isCreateMandateOpen.set(true)
      }}>Board</button
    >
  </div>
</div>

{#if $isOverlayOpen}
  {#if $isCreatePostOpen}
    <Overlay>
      <CreatePost />
    </Overlay>
  {:else if $isCreateMandateOpen}
    <Overlay>
      <CreateMandate onBoardChange={reloadBoard} />
    </Overlay>
  {/if}
{/if}

<div class="sm:flex">
  <Column
    posts={$posts}
    columnType={0}
    columnColor={'bg-sky-400'}
    title={'Before Death'}
  />
  <Column
    posts={$posts}
    columnType={1}
    columnColor={'bg-red-400'}
    title={'Death Happening'}
  />
  <Column
    posts={$posts}
    columnType={2}
    columnColor={'bg-amber-400'}
    title={'After Death'}
  />
</div>
