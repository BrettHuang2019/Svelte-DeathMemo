<script>
    import Error from '$lib/Error.svelte'
    import { createPost, getUser } from '$lib/services'

    let postTitle, postContent
    function handleCreatePost() {
        createPost({
            user: getUser().email,
            title: postTitle,
            content: postContent,
        })
        
    }
</script>

<form on:submit|preventDefault={handleCreatePost}>
    <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >New Post</label
    >
    <input
        type="text"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Post title"
        bind:value={postTitle}
    />
    <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Post content..."
        bind:value={postContent}
    />
    <button
        type="submit"
        class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
    >
        Publish post
    </button>
</form>
