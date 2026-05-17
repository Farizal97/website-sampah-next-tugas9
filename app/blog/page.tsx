export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugText = resolvedParams?.slug ? resolvedParams.slug.replace(/-/g, ' ') : '';

  return (
    <main className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
      <h1 style={{ textTransform: 'capitalize' }}>Edukasi: {slugText}</h1>
      <p>Ini adalah halaman dinamis untuk artikel sampah di RT 03.</p>
    </main>
  );
}
