export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '40px', color: '#2c3e50', marginBottom: '15px', fontWeight: '800' }}>
            Layanan <span style={{ color: '#2ecc71' }}>TrashCare</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Solusi lengkap pengelolaan kebersihan lingkungan RT 03.</p>
        </div>

        {/* Grid 6 Kartu (Pasti Simetris 3x2 di Desktop) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          
          {/* Kartu 1 */}
          <div style={serviceCard}>
            <div style={iconStyle}>🚚</div>
            <h3 style={titleStyle}>Pengangkutan Rutin</h3>
            <p style={descStyle}>Sampah rumah tangga diangkut rutin 3x seminggu (Senin, Rabu, Sabtu) pukul 07.00 WIB.</p>
          </div>

          {/* Kartu 2 */}
          <div style={serviceCard}>
            <div style={iconStyle}>♻️</div>
            <h3 style={titleStyle}>Bank Sampah</h3>
            <p style={descStyle}>Setor botol, plastik, dan kertasmu. Ubah sampah menjadi saldo tabungan warga.</p>
          </div>

          {/* Kartu 3 */}
          <div style={serviceCard}>
            <div style={iconStyle}>📱</div>
            <h3 style={titleStyle}>Dashboard Iuran</h3>
            <p style={descStyle}>Pantau status iuran kebersihan secara transparan dan real-time lewat aplikasi.</p>
          </div>

          {/* Kartu 4 (Layanan Baru) */}
          <div style={serviceCard}>
            <div style={iconStyle}>📦</div>
            <h3 style={titleStyle}>Angkut Sampah Besar</h3>
            <p style={descStyle}>Layanan khusus angkut furnitur bekas atau puing sisa renovasi dengan jadwal janji temu.</p>
          </div>

          {/* Kartu 5 (Layanan Baru) */}
          <div style={serviceCard}>
            <div style={iconStyle}>🌿</div>
            <h3 style={titleStyle}>Pelatihan Kompos</h3>
            <p style={descStyle}>Belajar cara mengolah limbah dapur menjadi pupuk tanaman organik yang bermanfaat.</p>
          </div>

          {/* Kartu 6 (Layanan Baru) */}
          <div style={serviceCard}>
            <div style={iconStyle}>🧹</div>
            <h3 style={titleStyle}>Kerja Bakti Rutin</h3>
            <p style={descStyle}>Koordinasi jadwal gotong-royong warga setiap hari Minggu pertama tiap bulannya.</p>
          </div>

        </div>

        {/* Banner Bantuan di Bawah */}
        <div style={{ 
          padding: '30px', 
          backgroundColor: '#fff', 
          borderRadius: '20px', 
          borderLeft: '10px solid #2ecc71',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ fontSize: '30px' }}>📢</div>
          <p style={{ margin: 0, color: '#2c3e50', fontWeight: '500' }}>
            Sampah di rumah Anda belum terangkut? Segera hubungi petugas melalui tombol aduan di aplikasi ini.
          </p>
        </div>

      </div>
    </main>
  );
}

// Styling tetap sama agar konsisten
const serviceCard = {
  backgroundColor: '#fff',
  padding: '40px 30px',
  borderRadius: '20px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
  textAlign: 'center' as const,
  border: '1px solid #f0f0f0'
};

const iconStyle = { fontSize: '40px', marginBottom: '20px' };
const titleStyle = { color: '#2c3e50', fontSize: '20px', marginBottom: '12px', fontWeight: 'bold' };
const descStyle = { color: '#636e72', fontSize: '14px', lineHeight: '1.6' };
