'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 max-w-md mb-4" style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <label htmlFor="search" className="sr-only">
        Cari nama warga
      </label>
      
      <input
        id="search"
        type="text"
        className="peer block w-full rounded-md border border-green-500 py-2 pl-10 text-sm outline-none focus:ring-2 focus:ring-green-400 text-black"
        placeholder="Cari nama warga..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #2ecc71' }}
      />
      
      {/* Ikon Kaca Pembesar (UKURANNYA SUDAH DIKUNCI) */}
      <svg
        style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          width: '20px',  /* Kunci lebar */
          height: '20px', /* Kunci tinggi */
          color: '#999' 
        }}
        xmlns="http://w3.org"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
}
