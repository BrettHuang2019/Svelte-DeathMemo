import {createClient} from '@supabase/supabase-js'

const SUPABSE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABSE_URL, SUPABASE_PUBLIC_KEY)

export default supabase