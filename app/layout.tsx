import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header>
          <nav className="container nav-flex">
            <div className="logo" style={{fontWeight:'bold', fontSize:'1.2rem'}}>TrashCare RT</div>
            <ul className="nav-links">
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/about">Tentang</Link></li>
              <li><Link href="/services">Layanan</Link></li>
              {/* SUDAH DIPERBAIKI KE /daftar-warga */}
              <li className="btn-nav"><Link href="/daftar-warga">Daftar Warga</Link></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer style={{marginTop: '2rem', padding: '1rem 0', borderTop: '1px solid #eee', textAlign: 'center'}}>
          <p>&copy; 2026 TrashCare RT 03. Program Sampah Bersih.</p>
        </footer>
      </body>
    </html>
  )
}
