import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sb_publishable_0pOC-xQdHvpiwmc2tbykGg_8d--0TE2',
  },
};

export default nextConfig;
