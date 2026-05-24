'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';

const LINKS = [
  { label: 'Panel', href: '/dashboard' },
  { label: 'Nueva actividad', href: '/dashboard/nueva-actividad' },
];

export function NavbarDashboard({ userName }: { userName?: string | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'rgba(26,26,26,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-surface-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link
            href="/dashboard"
            className="font-black text-xl tracking-tight transition-opacity hover:opacity-70"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#EDEBE8',
            }}
          >
            Andén
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-all duration-200 relative"
                  style={{
                    color: isActive ? '#EDEBE8' : 'rgba(237,235,232,0.45)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-4.5 inset-x-0 h-px"
                      style={{ background: 'var(--color-sand)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Usuario + logout desktop */}
          <div className="hidden md:flex items-center gap-4">
            {userName && (
              <span
                className="text-sm"
                style={{ color: 'rgba(237,235,232,0.4)' }}
              >
                {userName}
              </span>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
              style={{
                border: '1px solid var(--color-surface-border-hover)',
                color: 'rgba(237,235,232,0.6)',
              }}
            >
              Salir
            </button>
          </div>

          {/* Hamburger mobile */}
          <button
            className="cursor-pointer md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: '#EDEBE8' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: '#EDEBE8' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: '#EDEBE8' }}
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
              background: 'rgba(26,26,26,0.98)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--color-surface-border)',
            }}
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: pathname === link.href ? 'var(--color-sand)' : '#EDEBE8',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-4 flex flex-col gap-4"
              style={{ borderTop: '1px solid var(--color-surface-border)' }}
            >
              {userName && (
                <span
                  className="text-sm"
                  style={{ color: 'rgba(237,235,232,0.4)' }}
                >
                  {userName}
                </span>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="cursor-pointer text-left text-base font-medium"
                style={{ color: 'rgba(237,235,232,0.5)' }}
              >
                Cerrar sesión
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}