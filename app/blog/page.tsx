export default function BlogDetail({ params }: { params: { slug: string } }) {
  return (
    <main className="container" style={{padding: '100px 0', textAlign: 'center'}}>
      <h1>Edukasi: {params.slug.replace(/-/g, ' ')}</h1>
      <p>Ini adalah halaman dinamis untuk artikel sampah di RT 03.</p>
    </main>
  )
}
