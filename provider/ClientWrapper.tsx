'use client';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './QueryProvider'; 
import SupabaseProvider from './SupabaseProvider';
import 'react-toastify/dist/ReactToastify.css';

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryProvider> 
      <ToastContainer
        style={{ zIndex: 500000000000000 }}
        position="top-right"
        autoClose={3000}
      />
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </QueryProvider>
  );
}