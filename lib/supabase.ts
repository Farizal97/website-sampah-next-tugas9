import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Ekspor satu instance saja untuk dipakai bersama di semua komponen
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
