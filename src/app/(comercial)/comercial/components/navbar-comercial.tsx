'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';

const LINKS = [
  { label: 'El problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Roadmap', href: '#roadmap' },
];

export function NavbarComercial() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(245,240,232,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(26,26,26,0.08)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-black text-3xl tracking-tight transition-opacity hover:opacity-70"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
            }}
          >
            Andén
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link: { label: string; href: string }) => (
            <a  key={link.href}
                href={link.href}
                className="text-sm transition-opacity hover:opacity-60"
                style={{ color: 'var(--color-ink-soft)' }}
            >
            {link.label}
            </a>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <Link href="/login?modo=registro">
              <button
                className="cursor-pointer px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                style={{
                  background: 'var(--color-signal)',
                  color: 'var(--color-cream)',
                }}
              >
                Empezar gratis
              </button>
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: 'var(--color-ink)' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: 'var(--color-ink)' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: 'var(--color-ink)' }}
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
              background: 'rgba(245,240,232,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(26,26,26,0.08)',
            }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="text-2xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-ink)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-4 border-t"
              style={{ borderColor: 'rgba(26,26,26,0.08)' }}
            >
              <Link href="/login?modo=registro" onClick={() => setMenuOpen(false)}>
                <button
                  className="w-full py-4 rounded-lg text-base font-semibold tracking-wide"
                  style={{
                    background: 'var(--color-signal)',
                    color: 'var(--color-cream)',
                  }}
                >
                  Empezar gratis
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}