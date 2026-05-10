"use client"
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 1. Schema Validasi (Task 2)
const laporanSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  telepon: z.string().min(10, "No. Telepon minimal 10 digit").max(15, "No. Telepon kepanjangan"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter agar jelas")
})

export default function FormLaporan() {
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [loading, setLoading] = useState(false)
  
  // State untuk menampung pesan error dari Zod
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({}) // Reset error

    // 2. Proses Validasi (Task 2)
    const result = laporanSchema.safeParse({ nama, telepon, deskripsi })

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {}
      result.error.issues.forEach((issue) => {
        // Fix TypeScript: Paksa path index ke string
        const key = issue.path[0].toString() 
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('laporan')
        .insert([{ nama, telepon, deskripsi }])

      if (error) throw error

      alert("✅ Mantap! Laporan masuk database.")
      setNama(''); setTelepon(''); setDeskripsi('')
    } catch (error: any) {
      alert("❌ Gagal: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-area">
      <h2 style={{ marginBottom: '20px' }}>Formulir Laporan (SaaS Demo)</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div style={{ flex: 1, marginBottom: '10px' }}>
            <input 
              type="text" placeholder="Nama Lengkap *" 
              value={nama} onChange={(e) => setNama(e.target.value)}
              style={{ border: errors.nama ? '1px solid red' : '1px solid #ccc', width: '100%' }}
            />
            {errors.nama && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.nama}</p>}
          </div>
          <div style={{ flex: 1, marginBottom: '10px' }}>
            <input 
              type="tel" placeholder="No. Telepon *" 
              value={telepon} onChange={(e) => setTelepon(e.target.value)}
              style={{ border: errors.telepon ? '1px solid red' : '1px solid #ccc', width: '100%' }}
            />
            {errors.telepon && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.telepon}</p>}
          </div>
        </div>
        <div style={{ marginTop: '5px' }}>
          <textarea 
            placeholder="Deskripsi Masalah *" rows={4} 
            value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
            style={{ border: errors.deskripsi ? '1px solid red' : '1px solid #ccc', width: '100%' }}
          ></textarea>
          {errors.deskripsi && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.deskripsi}</p>}
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Validasi & Mengirim...' : 'Kirim Laporan Sekarang'}
        </button>
      </form>
    </div>
  )
}
