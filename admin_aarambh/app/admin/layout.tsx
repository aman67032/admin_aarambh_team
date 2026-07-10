'use client';
import Loader from '../components/Loader';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import PlasmaWave from '../components/PlasmaWave';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const allowedRoles = ['admin', 'super_admin', 'cluster_head', 'cohort_leader', 'teammember'];

  useEffect(() => {
    if (!loading) {
      if (!user || !allowedRoles.includes(user.role)) {
        router.push('/login');
      } else if (user.role === 'teammember') {
        if (pathname !== '/admin/duty-chart') {
          router.push('/admin/duty-chart');
        }
      } else if (user.role === 'cohort_leader') {
        if (pathname !== '/admin/duty-chart' && pathname !== '/cohort-registrations' && !pathname.startsWith('/cohort-leader')) {
          router.push('/cohort-leader');
        }
      } else if (user.role === 'cluster_head') {
        if (pathname !== '/admin/duty-chart' && pathname !== '/cohort-registrations' && !pathname.startsWith('/cluster-head')) {
          router.push('/cluster-head');
        }
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-card-bg/50 flex items-center justify-center">
        <Loader scale={0.7} label="Checking credentials..." />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto md:max-h-screen relative z-10">
        {children}
      </main>
    </div>
  );
}
