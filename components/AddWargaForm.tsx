'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddWargaForm() {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [status, setStatus] = useState('Lunas');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from('warga').insert([{ nama, alamat, status }]);
    if (!error) { setNama(''); setAlamat(''); router.refresh(); }
  };

  // Kunci semua ukuran di sini agar tidak ada yang bisa bantah
  const commonStyle = {
    height: '40px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none',
    backgroundColor: '#fff',
    display: 'block',
    width: '100%'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 'bold' as const,
    color: '#999',
    marginBottom: '5px',
    height: '15px', // Kunci tinggi label agar tidak dorong kotak
    lineHeight: '15px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '2' }}>
          <label style={labelStyle}>NAMA LENGKAP</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required style={{...commonStyle, padding: '0 12px'}} placeholder="Budi Santoso" />
        </div>

        <div style={{ flex: '1.5' }}>
          <label style={labelStyle}>ALAMAT / BLOK</label>
          <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} required style={{...commonStyle, padding: '0 12px'}} placeholder="Blok C-12" />
        </div>

        <div style={{ width: '130px' }}>
          <label style={labelStyle}>STATUS</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{...commonStyle, padding: '0 8px', cursor: 'pointer'}}>
            <option value="Lunas">Lunas</option>
            <option value="Tunggakan">Tunggakan</option>
          </select>
        </div>

        <div style={{ width: '130px' }}>
          {/* Label kosong agar tombol sejajar bawah dengan kotak lainnya */}
          <div style={labelStyle}></div> 
          <button type="submit" style={{ 
            ...commonStyle, 
            backgroundColor: '#2ecc71', 
            color: '#fff', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            SIMPAN DATA
          </button>
        </div>

      </div>
    </form>
  );
}
