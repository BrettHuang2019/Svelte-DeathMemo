import supabase from './supabase'

export function getUser() {
	return supabase.auth.user()
}

export async function signIn({email}) {
	const {error} = await supabase.auth
		.signIn({email})
	return {data: !error, error}
}

export async function signOut() {
	const {error} = await supabase.auth
		.signOut()
	return {data: !error, error}
}