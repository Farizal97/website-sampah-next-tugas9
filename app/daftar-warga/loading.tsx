export default function Loading() {
  return (
    <main style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Skeleton Judul */}
        <div className="skeleton" style={{ width: '400px', height: '40px', marginBottom: '10px', borderRadius: '8px' }}></div>
        <div className="skeleton" style={{ width: '250px', height: '20px', marginBottom: '35px', borderRadius: '6px' }}></div>

        {/* Skeleton Card Form */}
        <div className="skeleton" style={{ height: '180px', borderRadius: '12px', marginBottom: '30px' }}></div>

        {/* Skeleton Tabel Container */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {/* Skeleton Search Bar Area */}
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <div className="skeleton" style={{ width: '350px', height: '40px', borderRadius: '8px' }}></div>
          </div>

          {/* Skeleton Rows (Kita buat 5 baris bayangan) */}
          <div style={{ padding: '20px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" style={{ 
                height: '60px', 
                marginBottom: i === 5 ? '0' : '15px', 
                borderRadius: '8px' 
              }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Animasi CSS Pulse */}
      <style>{`
        .skeleton {
          background-color: #e0e0e0;
          background-image: linear-gradient(
            90deg, 
            #e0e0e0 25%, 
            #f0f0f0 50%, 
            #e0e0e0 75%
          );
          background-size: 200% 100%;
          animation: loading-shimmer 1.5s infinite;
        }

        @keyframes loading-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
