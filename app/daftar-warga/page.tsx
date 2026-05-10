import Search from '@/components/Search';
import AddWargaForm from '@/components/AddWargaForm';
import DeleteButton from '@/components/DeleteButton';
import EditStatusButton from '@/components/EditStatusButton';
import { supabase } from '@/lib/supabase';

export default async function DaftarWargaPage(props: {
  searchParams: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || '';

  // Ambil data asli dari Supabase
  const { data: warga } = await supabase
    .from('warga')
    .select('*')
    .ilike('nama', `%${query}%`)
    .order('created_at', { ascending: false });

  // Logika Statistik Dashboard
  const totalWarga = warga?.length || 0;
  const totalLunas = warga?.filter(w => w.status === 'Lunas').length || 0;
  const totalTunggakan = warga?.filter(w => w.status === 'Tunggakan').length || 0;

  return (
    <main style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#1a1a1a', fontSize: '32px', fontWeight: 'bold' }}>
            Dashboard <span style={{color: '#2ecc71'}}>Iuran & Warga</span>
          </h1>
          <p style={{ color: '#65676b', marginTop: '8px' }}>Pantau status pembayaran iuran sampah RT 03 secara real-time.</p>
        </div>

        {/* 1. Dashboard Stats Summary (Sesuai janji di halaman Layanan) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={statCard}>
            <p style={statLabel}>TOTAL WARGA</p>
            <p style={statValue}>{totalWarga}</p>
          </div>
          <div style={{...statCard, borderBottom: '4px solid #2ecc71'}}>
            <p style={statLabel}>SUDAH LUNAS</p>
            <p style={{...statValue, color: '#27ae60'}}>{totalLunas}</p>
          </div>
          <div style={{...statCard, borderBottom: '4px solid #e74c3c'}}>
            <p style={statLabel}>BELUM BAYAR</p>
            <p style={{...statValue, color: '#e74c3c'}}>{totalTunggakan}</p>
          </div>
        </div>

        {/* 2. Form Tambah Warga */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '25px', fontSize: '18px', color: '#1c1e21', borderLeft: '5px solid #2ecc71', paddingLeft: '15px' }}>Tambah Warga Baru</h3>
          <AddWargaForm />
        </div>

        {/* 3. Tabel Section */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
             <div style={{ width: '350px' }}><Search /></div>
             <span style={{ fontSize: '13px', color: '#999', fontWeight: 'bold' }}>LIST DATA WARGA</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '20px 30px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Nama Warga</th>
                <th style={{ padding: '20px 30px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Alamat</th>
                <th style={{ padding: '20px 30px', color: '#888', fontSize: '12px', textTransform: 'uppercase', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '20px 30px', color: '#888', fontSize: '12px', textTransform: 'uppercase', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {warga && warga.length > 0 ? (
                warga.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '20px 30px', fontWeight: 'bold', color: '#333' }}>{w.nama}</td>
                    <td style={{ padding: '20px 30px', color: '#666' }}>{w.alamat}</td>
                    <td style={{ padding: '20px 30px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
                        backgroundColor: w.status === 'Lunas' ? '#e6fcf5' : '#fff5f5',
                        color: w.status === 'Lunas' ? '#0ca678' : '#e03131',
                        border: `1px solid ${w.status === 'Lunas' ? '#c3fae8' : '#ffe3e3'}`
                      }}>{w.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '20px 30px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <EditStatusButton id={w.id} currentStatus={w.status} />
                        <DeleteButton id={w.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '50px', textAlign: 'center', color: '#999' }}>
                    {query ? `Warga "${query}" tidak ditemukan.` : "Belum ada data warga di database."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

// Styling Object untuk Stats
const statCard = {
  backgroundColor: '#fff',
  padding: '25px',  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center'
};
const statLabel = { fontSize: '11px', fontWeight: 'bold', color: '#888', margin: '0 0 10px 0', letterSpacing: '1px' };
const statValue = { fontSize: '32px', fontWeight: '800', margin: 0, color: '#333' };
