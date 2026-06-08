'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api, User } from '../lib/api';

interface AppContextType {
  user: User | null;
  loading: boolean;
  theme: 'light' | 'fun';
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'fun'>('light');
  const router = useRouter();
  const pathname = usePathname();

  // Load user and theme on mount
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('aarambh-theme') as 'light' | 'fun';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'fun') {
        document.documentElement.classList.add('theme-fun');
      }
    }

    // Auth check
    const checkAuth = async () => {
      try {
        const data = await api.auth.me();
        setUser(data.user);
      } catch (error) {
        setUser(null);
        // Redirect to login if on protected page
        if (pathname !== '/login') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Toggle Theme function
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'fun' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('aarambh-theme', nextTheme);
    
    if (nextTheme === 'fun') {
      document.documentElement.classList.add('theme-fun');
    } else {
      document.documentElement.classList.remove('theme-fun');
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.auth.login({ email, password });
      setUser(data.user);
      
      // Redirect based on role
      if (data.user.role === 'super_admin') {
        router.push('/super-admin');
      } else if (data.user.role === 'admin') {
        router.push('/admin');
      } else if (data.user.role === 'cluster_head') {
        router.push('/cluster-head');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.auth.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppContext.Provider value={{ user, loading, theme, toggleTheme, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
