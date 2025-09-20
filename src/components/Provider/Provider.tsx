'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode, useEffect, useState } from 'react'
import CartContextProvider from '../Context/CartContext'
import { Toaster } from 'sonner'
import Navbar from '../ui/Nvabar/Navbar'
import Footer from '../ui/Footer/Footer'
import WishlistContextProvider from '../Context/WishlistContext/WishlistContext'

export default function Provider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light'); // default

  useEffect(() => {
    const storedMode = localStorage.getItem('mode') as 'light' | 'dark' | null;
    if (storedMode) {
      setMode(storedMode);
      document.documentElement.classList.toggle('dark', storedMode === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  function changeMood() {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <SessionProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <main className="container mx-auto">
            <Toaster position="top-center" />
            <Navbar mode={mode} changeMood={changeMood} />
            <div className="min-h-96">{children}</div>
          </main>
          <Footer />
        </CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  );
}
