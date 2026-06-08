'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from './context/AppContext';

export default function RootPage() {
  const { user, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // Redirect based on role
        if (user.role === 'super_admin') {
          router.push('/super-admin');
        } else if (user.role === 'admin') {
          router.push('/admin');
        } else if (user.role === 'cluster_head') {
          router.push('/cluster-head');
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <span className="text-sm font-semibold text-slate-600">Loading Aarambh Portal...</span>
      </div>
    </div>
  );
}
