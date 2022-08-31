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

export async function createPost({title, content, user}) { // user is user's email
    const {data, error} = await supabase
      .from('posts')
      .insert({title, content, user})
    return {data, error}
}

export async function getPosts() {
  let {data, error} = await supabase
    .from('posts')
    .select('*')
    .order('created_at', {ascending: false})
    .limit(5)

  return {data, error}
}