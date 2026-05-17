import { createClient } from '@supabase/supabase-js'

// Mengambil nilai environment variable tanpa memaksa dengan tanda "!"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Menampilkan peringatan di terminal jika env benar-benar lupa terisi, tanpa membuat build gagal
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Peringatan: Kredensial NEXT_PUBLIC_SUPABASE_URL atau ANON_KEY tidak terdeteksi.");
}

// Ekspor instance dengan aman
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
