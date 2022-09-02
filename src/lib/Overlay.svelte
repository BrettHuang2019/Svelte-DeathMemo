<script>
    import { isOverlayOpen} from '$lib/stores.js'
    import {fade} from 'svelte/transition'
</script>

<div class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-100 opacity-90 z-10"
transition:fade
on:click={()=>{isOverlayOpen.set(false)}}>
    <div class="bg-gray-900 text-white rounded-md px-8 py-10 relative opacity-90"
    on:click|stopPropagation>
        <button class="absolute top-1 right-3 text-4xl text-gray-300 hover:-translate-y-0.5 transition-transform"
        on:click={()=>{isOverlayOpen.set(false)}}
        >&times;</button>
        <slot></slot>
    </div>
</div>