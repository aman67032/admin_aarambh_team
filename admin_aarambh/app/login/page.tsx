'use client';
import PlasmaWave from '../components/PlasmaWave';

import Loader from '../components/Loader';



import React, { useState, useEffect } from 'react';

import { useApp } from '../context/AppContext';

import { useRouter } from 'next/navigation';

import Link from 'next/link';



export default function LoginPage() {

  const { user, login, loading: authLoading } = useApp();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();



  // Redirect if already logged in

  useEffect(() => {

    if (user) {

      if (user.role === 'super_admin') router.push('/super-admin');

      else if (user.role === 'admin') router.push('/admin');

      else if (user.role === 'cluster_head') router.push('/cluster-head');

    }

  }, [user, router]);



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!email || !password) {

      setError('Please fill in all fields.');

      return;

    }



    setLoading(true);

    setError(null);

    try {

      await login(email, password);

    } catch (err: any) {

      setError(err.message || 'Login failed. Please check your credentials.');

    } finally {

      setLoading(false);

    }

  };



  if (authLoading) {

    return (

      <div className="min-h-screen bg-card-bg/50 flex items-center justify-center">

        <Loader scale={0.7} label="Loading Aarambh Portal..." />

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-background fun-bg-pattern flex flex-col justify-between relative overflow-hidden text-foreground">
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <PlasmaWave speed1={0.05} speed2={0.05} focalLength={0.8} bend1={1} bend2={0.5} dir2={1} rotationDeg={0} />
      </div>

      {/* Decorative background shapes */}

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] opacity-70 pointer-events-none"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] opacity-70 pointer-events-none"></div>



      {/* Header */}

      <header className="sticky top-0 bg-card-bg/70 backdrop-blur-md border-b border-card-border z-50 transition-all">

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3">

            <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-12 object-contain" />

            <div className="w-[1px] h-6 bg-card-border"></div>

            <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh logo" className="h-16 object-contain" />

            <div className="flex flex-col hidden sm:flex">

              <span className="text-xs font-bold text-primary font-outfit uppercase tracking-wider leading-none">Aarambh &apos;26</span>

              <span className="text-[8px] text-text-muted font-bold uppercase mt-0.5">JKLU</span>

            </div>

          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/cohort-registrations"
              className="px-4 py-2 border border-card-border text-foreground hover:bg-card-bg text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              Cohort Registrations
            </Link>
          </div>

        </div>

      </header>



      {/* Main Content Area */}

      <main className="flex-1 flex items-center justify-center p-4 z-10">

        <div className="w-full max-w-md glass-card p-8">

          

          {/* Portal Header */}

          <div className="text-center mb-8">

            <div className="flex justify-center items-center gap-3.5 mb-4">

              <img src="/JKLU Logo.svg" alt="JKLU Logo" className="h-16 object-contain" />

              <div className="w-[1px] h-8 bg-card-border"></div>

              <img src="/Aarambh_logo_Final-01.svg" alt="Aarambh logo" className="h-20 object-contain animate-float" />

            </div>

            <h1 className="text-3xl font-black tracking-tight text-foreground font-outfit">Aarambh 2026</h1>

            <p className="text-sm text-text-muted font-semibold mt-1">Team Coordination & Student Distribution</p>

          </div>



          {error && (

            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-2xl flex items-center gap-2">

              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">

                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>

              </svg>

              <span>{error}</span>

            </div>

          )}



          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>

              <div className="relative">

                <input

                  type="email"

                  placeholder="email@jklu.edu.in"

                  value={email}

                  onChange={(e) => setEmail(e.target.value)}

                  className="w-full px-4 py-3 bg-background/50 border border-card-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card-bg transition-all text-foreground font-medium"

                  required

                />

              </div>

            </div>



            <div>

              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Password</label>

              <input

                type="password"

                placeholder="••••••••"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                className="w-full px-4 py-3 bg-background/50 border border-card-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card-bg transition-all text-foreground"

                required

              />

            </div>



            <button

              type="submit"

              disabled={loading}

              className="w-full py-3.5 px-4 btn-premium text-white rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"

            >

              {loading ? (

                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

              ) : (

                <>

                  Sign In

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>

                  </svg>

                </>

              )}

            </button>

          </form>



          <div className="mt-8 text-center border-t border-card-border pt-6">

            <p className="text-xs text-text-muted font-semibold">JK Lakshmipat University, Jaipur</p>

          </div>

        </div>

      </main>



      {/* Footer */}

      <footer className="py-8 border-t border-card-border text-center text-xs font-bold text-text-muted z-10 bg-card-bg/50 backdrop-blur-sm">

        <div>JK Lakshmipat University, Jaipur © 2026</div>

      </footer>

    </div>

  );

}

