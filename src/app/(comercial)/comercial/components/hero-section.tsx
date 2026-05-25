'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { heroData } from '../data/landing.data';
import { MockupFeed } from './mockup-feed';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
  },
});

const VERBOS = ['buscando', 'pensando', 'eligiendo', 'decidiendo'];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % VERBOS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Textura grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Mancha cálida derecha */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(196,149,106,0.06) 100%)',
        }}
      />

      {/* Línea vertical izquierda */}
      <div
        className="absolute left-6 top-0 bottom-0 w-px z-10 pointer-events-none"
        style={{ background: 'var(--color-ink)', opacity: 0.06 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center py-28 md:py-0 min-h-screen">

        {/* ── Columna izquierda ── */}
        <div className="flex flex-col">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
            <div
              className="relative flex h-2 w-2 rounded-full"
              style={{ background: 'var(--color-turquoise-muted)' }}
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: 'var(--color-turquoise-muted)' }}
              />
            </div>
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-turquoise-muted)' }}
            >
              {heroData.socialProof}
            </span>
          </motion.div>

          {/* Headline con verbo rotativo */}
          <motion.div {...fadeUp(0.1)}>
            <h1
              className="font-black tracking-[-0.03em] mb-6"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.2rem, 4vw, 4rem)',
                color: 'var(--color-ink)',
                lineHeight: 1.08,
              }}
            >
              <span className="block whitespace-nowrap">Tu próximo cliente</span>

              <span className="block" style={{ overflow: 'clip', paddingBottom: '0.15em' }}>
                ya está{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
                    }}
                    className="inline-block italic"
                    style={{ color: 'var(--color-sand)' }}
                  >
                    {VERBOS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span className="block whitespace-nowrap">qué hacer hoy.</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-base leading-relaxed max-w-md mb-10"
            style={{ color: 'var(--color-ink-light)' }}
          >
            {heroData.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-16">
            <Link href="/login?modo=registro">
              <button
                className="cursor-pointer px-8 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
                style={{
                  background: 'var(--color-sand)',
                  color: 'var(--color-cream)',
                }}
              >
                {heroData.ctaPrimary}
              </button>
            </Link>
            <a
              href="#como-funciona"
              className="flex items-center gap-2 px-2 py-4 text-sm font-medium transition-all duration-300 hover:gap-4"
              style={{ color: 'var(--color-ink-light)' }}
            >
              <span>{heroData.ctaSecondary}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex justify-center md:justify-normal gap-10 pt-8"
            style={{ borderTop: '1px solid rgba(26,26,26,0.08)' }}
          >
            {[
              { valor: '0%',    label: 'Comisiones' },
              { valor: '2 min', label: 'Para publicar' },
              { valor: '24/7',  label: 'Visible siempre' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {stat.valor}
                </span>
                <span
                  className="text-xs uppercase tracking-widest font-mono"
                  style={{ color: 'var(--color-ink-light)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Mobile: mockup de fondo ── */}
        <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden -z-50">
          <div
            className="absolute right-[-10%] top-[10%] w-[80vw] h-[80%]"
            style={{ opacity: 0.2 }}
          >
            <MockupFeed />
          </div>
        </div>

        {/* ── Desktop: mockup columna derecha ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
          }}
          className="hidden md:flex items-center justify-center h-[75vh] relative"
        >
          <MockupFeed />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, var(--color-ink-light), transparent)',
            opacity: 0.6,
          }}
        />
      </motion.div>
    </section>
  );
}
