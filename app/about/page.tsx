export default function AboutPage() {
  return (
    <main style={{ backgroundColor: '#f9fafb', minHeight: '90vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ 
            backgroundColor: '#e9f7ef', 
            color: '#27ae60', 
            padding: '5px 15px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>Informasi Sistem</span>
          <h1 style={{ fontSize: '38px', color: '#2c3e50', marginTop: '15px', marginBottom: '20px' }}>
            Tentang <span style={{ color: '#2ecc71' }}>TrashCare RT 03</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#7f8c8d', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto' }}>
            Platform digital mandiri yang dirancang khusus untuk memodernisasi pengelolaan sampah dan transparansi iuran warga di lingkungan RT 03.
          </p>
        </div>

        {/* Misi Section - Grid Kartu */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '25px', 
          marginBottom: '60px' 
        }}>
          
          <div style={cardStyle}>
            <div style={iconCircle}>🌱</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '12px' }}>Ramah Lingkungan</h3>
            <p style={{ color: '#636e72', fontSize: '14px', lineHeight: '1.6' }}>
              Mendorong kesadaran warga dalam memilah sampah rumah tangga demi lingkungan yang lebih asri.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconCircle}>📊</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '12px' }}>Data Real-Time</h3>
            <p style={{ color: '#636e72', fontSize: '14px', lineHeight: '1.6' }}>
              Pencatatan iuran yang transparan dan dapat dipantau langsung oleh pengurus maupun warga.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={iconCircle}>⚡</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '12px' }}>Efisiensi Kerja</h3>
            <p style={{ color: '#636e72', fontSize: '14px', lineHeight: '1.6' }}>
              Mempercepat proses administrasi RT tanpa perlu lagi menggunakan pembukuan kertas yang berisiko hilang.
            </p>
          </div>
          
        </div>

        {/* Visi Section */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '45px', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '1px solid #f0f0f0'
        }}>
          <h2 style={{ color: '#2ecc71', marginBottom: '20px', fontSize: '26px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '5px', height: '25px', backgroundColor: '#2ecc71', borderRadius: '10px' }}></span>
            Visi & Komitmen
          </h2>
          <p style={{ color: '#2c3e50', fontSize: '16px', lineHeight: '1.8', marginBottom: '15px' }}>
            TrashCare lahir dari semangat gotong royong warga RT 03 untuk menjawab tantangan pengelolaan limbah di era digital. Kami berkomitmen untuk menyediakan sistem yang andal dan mudah digunakan.
          </p>
          <p style={{ color: '#2c3e50', fontSize: '16px', lineHeight: '1.8' }}>
            Melalui aplikasi ini, diharapkan tidak ada lagi keterlambatan pengangkutan sampah maupun kekeliruan data iuran, sehingga tercipta hubungan warga yang harmonis dan lingkungan yang sehat.
          </p>
        </div>

      </div>
    </main>
  );
}

// Styling Object
const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '35px 25px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  textAlign: 'center',
  border: '1px solid #f0f0f0',
  transition: 'transform 0.3s ease'
};

const iconCircle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  backgroundColor: '#f0fff4',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  margin: '0 auto 20px auto',
  border: '1px solid #dcfce7'
};
