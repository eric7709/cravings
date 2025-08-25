'use client';
import { supabase } from '@/lib/supabase';
import { Children } from '@/types/shared';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function SupabaseProvider({ children }: Children) {
  const [client] = useState(() => supabase);
  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  );
}
