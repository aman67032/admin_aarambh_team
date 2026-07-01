'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import AuroraBackground from '../components/AuroraBackground';
import Loader from '../components/Loader';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';

export default function CohortRegistrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useApp();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-card-bg/50 flex items-center justify-center">
        <Loader scale={0.7} label="Checking credentials..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background relative overflow-hidden">
      <AuroraBackground />
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto md:max-h-screen relative z-10">
        {children}
      </main>
    </div>
  );
}
