'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function DeleteButton({ id }: { id: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (confirm('Yakin ingin menghapus data warga ini?')) {
      startTransition(async () => {
        await supabase.from('warga').delete().eq('id', id);
        router.refresh();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      style={{
        backgroundColor: '#ef4444', // Merah tegas
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
        transition: '0.2s',
        opacity: isPending ? 0.7 : 1
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
    >
      {isPending ? '...' : 'HAPUS'}
    </button>
  );
}
