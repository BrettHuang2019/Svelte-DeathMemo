<script>
  import Error from '$lib/Error.svelte'
  import { createPost, getUser } from '$lib/services'
  import { isOverlayOpen } from '$lib/stores.js'
  import { slide } from 'svelte/transition'

  let postTitle, postContent
  let postType = 0 
  let postTypeStr = "Before Death"
  function handleCreatePost() {
    console.log(postType);
    createPost({
      user: getUser().email,
      title: postTitle,
      content: postContent,
      type: postType,
    })
    isOverlayOpen.set(false)
  }

  let isExpanded = false
  function typeClickHandler() {
    isExpanded = !isExpanded
  }

  function selectType(type, typeName) {
    postType = type
    postTypeStr = typeName
    isExpanded = false
  }


</script>

<form class="w-96" on:submit|preventDefault={handleCreatePost}>
  <label
    for="message"
    class="block mb-2 text-sm font-medium text-3xl text-white-900 dark:text-gray-400"
    >New Memo</label
  >
  <input
    type="text"
    class="block p-2.5 w-full mb-2 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Post title"
    bind:value={postTitle}
  />

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative inline-block mb-2 w-full text-left">
    <div>
      <button
        type="button"
        class="inline-flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        on:click={typeClickHandler}
      >
        {postTypeStr}
        <!-- Heroicon name: mini/chevron-down -->
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    {#if isExpanded}
      <div
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        transition:slide
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a
            href="#"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            on:click={() => selectType(0, "Before Death")}>Before Death</a
          >
          <a
            href="#"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            on:click={() => selectType(1, "During Death")}>During Death</a
          >
          <a
            href="#"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            on:click={() => selectType(2, "After Death")}>After Death</a
          >
        </div>
      </div>
    {/if}
  </div>
  <textarea
    id="message"
    rows="4"
    class="block p-2.5 w-full mb-2 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Post content..."
    bind:value={postContent}
  />
  <button
    type="submit"
    class="inline-flex items-center px-5 py-2.5 text-2xl font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
  >
    Publish post
  </button>
</form>
