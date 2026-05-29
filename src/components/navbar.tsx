'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';

export function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(13,27,42,0.95)' : 'rgba(13,27,42,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="font-black text-xl tracking-tight transition-opacity hover:opacity-70 shrink-0"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: 'var(--color-signal)',
            }}
          >
            Andén
          </Link>

          {/* Buscador desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscá actividades, destinos, rubros..."
                className="w-full h-9 pl-9 pr-4 rounded-full text-sm outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#EDEBE8',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255,159,28,0.3)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.background = 'rgba(255,255,255,0.06)';
                }}
              />
              {/* Ícono lupa */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Derecha */}
          <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
            {/* Dashboard si está logueado */}
            {!loading && session && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  Mi panel
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  Salir
                </button>
              </>
            )}

            {/* CTA para prestadores — siempre visible */}
            {!loading && !session && (
              <Link href="/comercial">
                <button
                  className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 whitespace-nowrap"
                  style={{
                    background: 'rgba(255,159,28,0.08)',
                    border: '1px solid rgba(255,159,28,0.2)',
                    color: 'var(--color-signal)',
                  }}
                >
                  Publicá tus actividades →
                </button>
              </Link>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden cursor-pointer flex flex-col gap-1.5 p-2 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
            className="fixed top-16 inset-x-0 z-40 px-6 py-8 flex flex-col gap-6"
            style={{
              background: 'rgba(13,27,42,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Buscador mobile */}
            <form onSubmit={handleSearch}>
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscá actividades, destinos..."
                  className="w-full h-11 pl-10 pr-4 rounded-full text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#EDEBE8',
                  }}
                />
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            <div
              className="flex flex-col gap-5 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-lg font-semibold text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="cursor-pointer text-left text-base"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/comercial"
                  className="text-lg font-semibold"
                  style={{ color: 'var(--color-signal)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Publicá tus actividades →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}