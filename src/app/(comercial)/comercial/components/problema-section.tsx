'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { problemaData } from '../data/landing.data';

export function ProblemaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const rm = useReducedMotion();

  return (
    <section
      id="problema"
      ref={ref}
      className="relative py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--color-cream-2)' }}
    >
      {/* Borde superior */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'rgba(26,26,26,0.08)' }}
      />

      {/* Número decorativo de fondo */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 text-[20rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: 'rgba(26,26,26,0.03)',
          fontFamily: 'var(--font-display)',
        }}
        aria-hidden="true"
      >
        ?
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="mb-20"
        >
          <span
            className="text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            El problema
          </span>
          <h2
            className="mt-4 font-black leading-none tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: 'var(--color-ink)',
            }}
          >
            {problemaData.headline}
          </h2>
        </motion.div>

        {/* Items */}
        <div style={{ borderTop: '1px solid rgba(26,26,26,0.08)' }}>
          {problemaData.items.map((item, index) => (
            <motion.div
              key={index}
              initial={rm ? false : { opacity: 0, x: -24 }}
              animate={rm || isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
              }}
              className="group relative grid grid-cols-[auto_1fr] items-center gap-8 py-10 cursor-default"
              style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}
            >
              {/* Número */}
              <span
                className="text-[clamp(3rem,5vw,5rem)] font-black leading-none tabular-nums transition-colors duration-500"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'rgba(26,26,26,0.2)',
                }}
              >
                0{index + 1}
              </span>

              {/* Contenido */}
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 group-hover:opacity-70"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {item.titulo}
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed max-w-xl"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {item.descripcion}
                </p>
              </div>

              {/* Línea de acento izquierda al hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                style={{ background: 'var(--color-signal)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Borde inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'rgba(26,26,26,0.08)' }}
      />
    </section>
  );
}
