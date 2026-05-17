"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchLaporan() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  // Mengambil nilai pencarian awal dari URL jika ada
  const [term, setTerm] = useState(searchParams.get('query')?.toString() || '')

  const handleSearch = (value: string) => {
    setTerm(value)
    const params = new URLSearchParams(searchParams)
    
    if (value) {
      params.set('query', value) // Masukkan kata kunci ke URL
    } else {
      params.delete('query') // Hapus dari URL jika kosong
    }
    
    // Perbarui URL secara real-time tanpa reload halaman (Task 3)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="🔍 Cari laporan berdasarkan nama/masalah..."
        value={term}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
    </div>
  )
}
