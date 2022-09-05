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

export async function createPost({ title, content, user, type }) {
  // user is user's email
  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, user, type })
  return { data, error }
}

export async function getPosts() {
  let { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return { data, error }
}

export async function deletePost(id) {
  const { data, error } = await supabase.from('posts').delete().match({ id })

  return { data, error }
}

export async function createMandate({ mandatary }) {
  if (getUser().email === mandatary) {
    return { error: { code: 0, message: 'Cannot as self as mandarary' } }
  }

  const { data, error } = await supabase
    .from('mandate')
    .insert({ mandator: getUser().email, mandatary })
  return { data, error }
}

export async function getMandate({ mandatary }) {
  let { data, error } = await supabase
    .from('mandate')
    .select('*')
    .eq('mandator', getUser().email)

  return { data, error }
}

export async function deleteMandate(id) {
  const { data, error } = await supabase.from('mandate').delete().match({ id })

  return { data, error }
}

export async function getMandator() {
  let { data, error } = await supabase
    .from('mandate')
    .select('*')
    .eq('mandatary', getUser().email)

  return { data, error }
}
