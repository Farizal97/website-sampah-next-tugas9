import FormLaporan from '@/components/FormLaporan'

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Kelola Sampah RT Lebih Cerdas & Rapih</h1>
          <p>Platform SaaS untuk manajemen pengambilan sampah warga. Jadwal akurat, pelaporan mudah, dan lingkungan asri.</p>
          <a href="#lapor" className="btn-main">Mulai Lapor Sekarang</a>
        </div>
        <div className="hero-image">
          <img src="/hero-bins.png" alt="Sistem Pemilahan Sampah TrashCare" 
    style={{ 
        width: '100%', 
        borderRadius: '15px', 
        boxShadow: '0 15px 40px rgba(0,0,0,0.1)' 
    }} 
  />
        </div>
      </section>

      {/* Jadwal Section */}
      <section className="features">
        <h2>Fitur Utama & Jadwal Minggu Ini</h2>
        <p style={{color:'#7f8c8d'}}>Sistem otomatisasi untuk RT 03 / RW 05</p>
        <div className="card-grid">
          <div className="card">
            <h3>Jadwal Otomatis</h3>
            <p style={{marginTop:'10px'}}>Senin, 21 Apr</p>
            <p style={{color:'#27ae60', fontWeight:'bold'}}>● Sampah Organik</p>
            <p>07:00 - 09:00 WIB</p>
          </div>
          <div className="card">
            <h3>Laporan Cepat</h3>
            <p style={{marginTop:'10px'}}>Laporkan penjemputan terlambat dalam &lt; 1 menit.</p>
          </div>
          <div className="card">
            <h3>Koordinator RT</h3>
            <p style={{marginTop:'10px'}}>Akses langsung ke Bapak Suryanto untuk keadaan darurat.</p>
          </div>
        </div>
      </section>

      {/* Testimoni & Form Lapor */}
      <section className="lapor-flex" id="lapor">
        <div className="testimonial-area">
          <h2>Apa Kata Warga?</h2>
          <div className="testi-card" style={{marginTop:'20px'}}>
            <p>"Dulu sampah numpuk, sekarang dengan TrashCare, penjemputan selalu tepat waktu. RT jadi bersih!"</p>
            <cite style={{display:'block', marginTop:'15px', fontWeight:'bold', color:'#27ae60', fontStyle:'normal'}}>- Ibu Kos Galak (Warga RT 03)</cite>
          </div>
        </div>
        <FormLaporan />
      </section>
    </main>
  )
}
