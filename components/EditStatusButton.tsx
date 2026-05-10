'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function EditStatusButton({ id, currentStatus }: { id: any, currentStatus: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleStatus = () => {
    const nextStatus = currentStatus === 'Lunas' ? 'Tunggakan' : 'Lunas';
    startTransition(async () => {
      await supabase.from('warga').update({ status: nextStatus }).eq('id', id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={isPending}
      style={{
        backgroundColor: '#3b82f6', // Biru modern
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
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
    >
      {isPending ? '...' : 'UBAH'}
    </button>
  );
}
