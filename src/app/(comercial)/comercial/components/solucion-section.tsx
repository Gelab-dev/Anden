'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import Link from 'next/link';
import { solucionData } from '../data/landing.data';

export function SolucionSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const rm = useReducedMotion();

  return (
    <section
      id="solucion"
      ref={ref}
      className="relative py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="mb-24 max-w-xl"
        >
          <span
            className="text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            La solución
          </span>
          <h2
            className="mt-4 font-black leading-none tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: 'var(--color-ink)',
            }}
          >
            {solucionData.headline}
          </h2>
        </motion.div>

        {/* Items */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(26,26,26,0.08)' }}>
          {solucionData.items.map((item, index) => (
            <motion.div
              key={index}
              initial={rm ? false : { opacity: 0, y: 32 }}
              animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
              }}
              className="group relative p-10 transition-colors duration-500"
              style={{ background: 'var(--color-cream)' }}
            >
              {/* Número grande */}
              <div
                className="text-[6rem] font-black leading-none mb-6 tabular-nums transition-colors duration-500"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'rgba(26,26,26,0.2)',
                }}
              >
                {item.numero}
              </div>

              {/* Línea sand top al hover */}
              <div
                className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: 'var(--color-signal)' }}
              />

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--color-ink)' }}
              >
                {item.titulo}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                {item.descripcion}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
          }}
          className="mt-16 flex justify-center"
        >
          <Link href="/login?modo=registro">
            <button
              className=" cursor-pointer px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background: 'var(--color-signal)',
                color: 'var(--color-board)',
              }}
            >
              Empezar gratis
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}