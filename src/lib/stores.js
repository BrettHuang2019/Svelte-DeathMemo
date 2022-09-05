import {writable, readable} from 'svelte/store'
import supabase from '$lib/supabase'
import { getUser, getPosts, signOut, getMandate } from '$lib/services'

export const currentEmail = writable("default email");
export const isOverlayOpen = writable(false);

export const isCreatePostOpen = writable(false)
export const isCreateMandateOpen = writable(false)

export const mandataryStore = writable([])
export const mandatorStore = writable([])
export const currentBoard = writable('default email')

export const currentPosts = writable(null)