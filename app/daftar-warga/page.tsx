"use client"
import { useState, useEffect, useOptimistic, startTransition } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Warga {
  id: string
  nama: string
  alamat: string
  status: string
}

export default function DaftarWargaPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // State Manajemen Input & Notifikasi
  const [namaInput, setNamaInput] = useState('')
  const [alamatInput, setAlamatInput] = useState('')
  const [statusInput, setStatusInput] = useState('Lunas')
  const [loading, setLoading] = useState(false)
  const [systemMessage, setSystemMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // State Sumber Data Database
  const [dataWarga, setDataWarga] = useState<Warga[]>([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || '')

  // 1. PERFORMANCE & UX: OPTIMISTIC UI LAYOUT (Sesuai PDF Bab 2)
  const [optimisticWarga, setOptimisticWarga] = useOptimistic(
    dataWarga,
    (state, { action, id, newWarga }) => {
      if (action === 'delete') return state.filter((w) => w.id !== id)
      if (action === 'create' && newWarga) return [newWarga, ...state]
      return state
    }
  )

  // 2. READINESS AUDIT: FETCH DATA TANPA LOGS (Sesuai PDF Bab 1)
  const fetchWarga = async () => {
    let query = supabase.from('warga').select('*')
    const keyword = searchParams.get('query')
    if (keyword) {
      query = query.ilike('nama', `%${keyword}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (!error && data) {
      setDataWarga(data)
    }
  }

  useEffect(() => {
    fetchWarga()
  }, [searchParams])

  // 3. CREATE DATA: INSERT DATA WITH SYSTEM UI STATE
  const handleSimpanData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!namaInput || !alamatInput) {
      setSystemMessage({ text: 'Kolom Nama Lengkap dan Alamat wajib diisi!', type: 'error' })
      return
    }
    setLoading(true)
    setSystemMessage(null)

    const tempId = Math.random().toString()
    const newRecord: Warga = { id: tempId, nama: namaInput, alamat: alamatInput, status: statusInput }

    startTransition(() => {
      setOptimisticWarga({ action: 'create', id: tempId, newWarga: newRecord })
    })

    try {
      const { error } = await supabase
        .from('warga')
        .insert([{ nama: namaInput, alamat: alamatInput, status: statusInput }])

      if (error) throw error

      setSystemMessage({ text: 'Data warga berhasil diamankan ke cloud server!', type: 'success' })
      setNamaInput('')
      setAlamatInput('')
      fetchWarga()
    } catch (err: any) {
      setSystemMessage({ text: 'Gagal sinkronisasi data server: ' + err.message, type: 'error' })
      fetchWarga()
    } finally {
      setLoading(false)
    }
  }

  // 4. DELETE DATA: HAPUS INSTAN OPTIMISTIC UI
  const handleHapusWarga = async (id: string) => {
    setSystemMessage(null)
    
    startTransition(() => {
      setOptimisticWarga({ action: 'delete', id })
    })

    try {
      const { error } = await supabase.from('warga').delete().eq('id', id)
      if (error) throw error
      setSystemMessage({ text: 'Data warga berhasil dihapus dari cloud.', type: 'success' })
      fetchWarga()
    } catch (err: any) {
      setSystemMessage({ text: 'Gagal menghapus data: ' + err.message, type: 'error' })
      fetchWarga()
    }
  }

  // 5. ACCESSIBILITY: URL AS STATE SYNC
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  // KALKULASI RINGKASAN DATA
  const totalWarga = optimisticWarga.length
  const sudahLunas = optimisticWarga.filter(w => w.status.toLowerCase() === 'lunas').length
  const belumBayar = totalWarga - sudahLunas

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* NOTIFIKASI SYSTEM UI (Bukan alert pop-up) */}
      {systemMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontWeight: '500',
          fontSize: '14px',
          backgroundColor: systemMessage.type === 'success' ? '#e6f4ea' : '#fce8e6',
          color: systemMessage.type === 'success' ? '#137333' : '#c5221f',
          border: `1px solid ${systemMessage.type === 'success' ? '#137333' : '#c5221f'}`
        }}>
          {systemMessage.text}
        </div>
      )}

      {/* HEADER SECTION */}
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
        Dashboard <span style={{ color: '#22c55e' }}>Iuran & Warga</span>
      </h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
        Pantau status pembayaran iuran sampah RT 03 secara real-time.
      </p>

      {/* COUNTER CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Total Warga</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{totalWarga}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #22c55e', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Sudah Lunas</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e', margin: '10px 0 0 0' }}>{sudahLunas}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ef4444', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Belum Bayar</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', margin: '10px 0 0 0' }}>{belumBayar}</p>
        </div>
      </div>

      {/* INPUT MANAGEMENT BLOCK (FIX DESIGN FIDELITY: LURUS SEJAJAR RATA BAWAH) */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 20px 0', borderLeft: '4px solid #22c55e', paddingLeft: '10px' }}>
          Tambah Warga Baru
        </h3>
        <form onSubmit={handleSimpanData} style={{ 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'flex-end', 
          width: '100%' 
        }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nama Lengkap</label>
            <input type="text" placeholder="Budi Santoso" value={namaInput} onChange={(e) => setNamaInput(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', height: '40px' }} />
          </div>
          
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Alamat / Blok</label>
            <input type="text" placeholder="Blok C-12" value={alamatInput} onChange={(e) => setAlamatInput(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', height: '40px' }} />
          </div>
          
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Status</label>
            <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff', boxSizing: 'border-box', height: '40px' }}>
              <option value="Lunas">Lunas</option>
              <option value="Belum Bayar">Belum Bayar</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} style={{ 
            backgroundColor: '#22c55e', 
            color: '#fff', 
            padding: '0 20px', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            height: '40px', 
            boxSizing: 'border-box',
            whiteSpace: 'nowrap'
          }}>
            {loading ? 'Proses...' : 'SIMPAN DATA'}
          </button>
        </form>
      </div>

      {/* FILTER SEARCH & DATA TABLE RENDERING */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '300px' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Cari nama warga</label>
            <input type="text" placeholder="🔍 Cari nama warga..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#999' }}>LIST DATA WARGA</span>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
          {optimisticWarga.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px 0' }}>Belum ada data warga di database.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#888', fontSize: '13px', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '12px' }}>NAMA WARGA</th>
                  <th style={{ padding: '12px' }}>ALAMAT</th>
                  <th style={{ padding: '12px' }}>STATUS</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {optimisticWarga.map((warga) => (
                  <tr key={warga.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{warga.nama}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{warga.alamat}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                        backgroundColor: warga.status === 'Lunas' ? '#e6f4ea' : '#fce8e6',
                        color: warga.status === 'Lunas' ? '#137333' : '#c5221f'
                      }}>{warga.status}</span>
                    </td>
                    <td style={{ padding: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>UBAH</button>
                      <button onClick={() => handleHapusWarga(warga.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>HAPUS</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
