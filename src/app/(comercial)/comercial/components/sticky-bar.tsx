'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { ctaFinalData } from '../data/landing.data';

export function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* CTA final */}
      <section
        className="relative py-48 px-6 md:px-12 overflow-hidden"
        style={{ background: 'var(--color-cream-2)' }}
      >
        {/* Borde superior */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'rgba(26,26,26,0.08)' }}
        />

        {/* Marca de agua tipográfica de fondo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="text-[20vw] font-black leading-none tracking-tighter opacity-[0.035]"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
            }}
          >
            Andén
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div
                className="h-px w-12"
                style={{ background: 'rgba(26,26,26,0.15)' }}
              />
              <span
                className="text-xs font-mono tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                Es tu momento
              </span>
              <div
                className="h-px w-12"
                style={{ background: 'rgba(26,26,26,0.15)' }}
              />
            </div>

            {/* Headline */}
            <h2
              className="font-black leading-[0.95] tracking-[-0.04em] mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                color: 'var(--color-ink)',
              }}
            >
              {ctaFinalData.headline}
            </h2>

            <p
              className="text-lg leading-relaxed max-w-xl mx-auto mb-12"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {ctaFinalData.subheadline}
            </p>

            <Link href="/login?modo=registro">
              <button
                className="px-10 py-5 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:opacity-90 cursor-pointer hover:scale-[1.03]"
                style={{
                  background: 'var(--color-ink)',
                  color: 'var(--color-cream)',
                }}
              >
                {ctaFinalData.cta}
              </button>
            </Link>

            {/* Social proof sutil */}
            <p
              className="mt-8 text-xs font-mono tracking-wider uppercase"
              style={{ color: 'rgba(26,26,26,0.3)' }}
            >
              Sin tarjeta de crédito · Sin contrato · Sin comisiones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
            }}
            className="fixed bottom-0 inset-x-0 z-50"
          >
            {/* Línea superior */}
            <div
              className="h-px w-full"
              style={{ background: 'rgba(26,26,26,0.1)' }}
            />

            <div
              className="backdrop-blur-md"
              style={{
                background: 'rgba(245,240,232,0.96)',
                borderTop: '1px solid rgba(26,26,26,0.06)',
              }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">

              <div className="hidden md:flex items-center gap-6">
              <p
                className="text-sm"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                <span
                  className="font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Andén
                </span>
                {' '}— Aparecé en el momento justo.
              </p>
            </div>

                <Link href="/registro" className="ml-auto">
                  <button
                    className="cursor-pointer px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                    style={{
                      background: 'var(--color-signal)',
                      color: 'var(--color-board)',
                    }}
                  >
                    Empezar gratis
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}