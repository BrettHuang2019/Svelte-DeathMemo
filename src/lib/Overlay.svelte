<script>
    import { isOverlayOpen, isCreatePostOpen, isCreateMandateOpen} from '$lib/stores.js'
    import {fade} from 'svelte/transition'

    function closeOverlay(){
        isOverlayOpen.set(false)
        isCreatePostOpen.set(false)
        isCreateMandateOpen.set(false)
    }
</script>

<div class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-gray-100 opacity-90 z-10"
transition:fade
on:click={closeOverlay}>
    <div class="bg-gray-900 text-white rounded-md px-8 py-10 relative"
    on:click|stopPropagation>
        <button class="absolute top-1 right-3 text-4xl text-gray-300 hover:-translate-y-0.5 transition-transform"
        on:click={closeOverlay}
        >&times;</button>
        <slot></slot>
    </div>
</div>