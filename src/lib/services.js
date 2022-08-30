import supabase from './supabase'

export function getUser() {
  return supabase.auth.user()
}

export async function signUp({ email, password }) {
  const { user, error } = await supabase.auth.signUp({ email, password })
  return { user, error }
}

export async function signIn({ email, password }) {
  const { user, error } = await supabase.auth.signIn({ email, password })
  return { user, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { data: !error, error }
}
