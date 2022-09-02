import { getPosts } from '$lib/services'
import { readable, get } from 'svelte/store'
import supabase from '$lib/supabase'
import { getUser } from '$lib/services'
import { currentEmail } from '$lib/stores.js'

export async function load() {
    // const { data, error } = await getPosts()
    // return {data, error}

    if (currentEmail === "default email") {
        let user = getUser();
        if (user) {
            console.log(user);
            currentEmail.set(user.email);
        }
    }
}
