'use client';
import { ADMIN_REDIRECT_LINK, CASHIER_REDIRECT_LINK, KITCHEN_REDIRECT_LINK, WAITER_REDIRECT_LINK} from '@/constants/redirectUrls';
import { useRole } from '@/hooks/useRole';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, loading } = useRole();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!role) {
      router.replace('/'); 
      return;
    }

    switch (role.toLowerCase()) {
      case 'admin':
        router.replace(ADMIN_REDIRECT_LINK);
        break;
      case 'waiter':
        router.replace(WAITER_REDIRECT_LINK);
        break;
      case 'cashier':
        router.replace(CASHIER_REDIRECT_LINK);
        break;
      case 'chef':
      case 'cook':
        router.replace(KITCHEN_REDIRECT_LINK);
        break;
      default:
        router.replace('/'); 
    }
  }, [role, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}