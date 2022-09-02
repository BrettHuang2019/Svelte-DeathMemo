import {writable} from 'svelte/store'

export const currentEmail = writable("default email");
export const isOverlayOpen = writable(false);