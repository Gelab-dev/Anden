'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { roadmapData } from '../data/landing.data';

const estadoConfig = {
  disponible: {
    label: 'Disponible ahora',
    dotClass: 'animate-pulse',
    dotColor: 'var(--color-signal)',
    badgeBorder: 'rgba(0,168,150,0.25)',
    badgeBg: 'rgba(0,168,150,0.06)',
    badgeText: 'var(--color-signal)',
    cardBorder: 'rgba(0,168,150,0.2)',
    cardBg: 'var(--color-cream)',
    checkColor: 'var(--color-signal)',
    textColor: 'var(--color-ink-soft)',
    scale: true,
  },
  proximo: {
    label: 'Próximamente',
    dotClass: '',
    dotColor: 'rgba(26,26,26,0.2)',
    badgeBorder: 'rgba(26,26,26,0.1)',
    badgeBg: 'transparent',
    badgeText: 'var(--color-ink-soft)',
    cardBorder: 'rgba(26,26,26,0.08)',
    cardBg: 'var(--color-cream)',
    checkColor: 'rgba(26,26,26,0.2)',
    textColor: 'rgba(26,26,26,0.35)',
    scale: false,
  },
  futuro: {
    label: 'En desarrollo',
    dotClass: '',
    dotColor: 'rgba(26,26,26,0.12)',
    badgeBorder: 'rgba(26,26,26,0.06)',
    badgeBg: 'transparent',
    badgeText: 'rgba(26,26,26,0.3)',
    cardBorder: 'rgba(26,26,26,0.06)',
    cardBg: 'var(--color-cream)',
    checkColor: 'rgba(26,26,26,0.12)',
    textColor: 'rgba(26,26,26,0.25)',
    scale: false,
  },
} as const;

type Estado = keyof typeof estadoConfig;

export function RoadmapSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const rm = useReducedMotion();

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Borde superior */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'rgba(26,26,26,0.08)' }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="mb-6"
        >
          <span
            className="text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Roadmap
          </span>
          <h2
            className="mt-4 font-black leading-none tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: 'var(--color-ink)',
            }}
          >
            {roadmapData.headline}
          </h2>
        </motion.div>

        <motion.p
          initial={rm ? false : { opacity: 0, y: 16 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
          }}
          className="text-base leading-relaxed max-w-xl mb-20"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          {roadmapData.subheadline}
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:items-start">
          {roadmapData.fases.map((fase, index) => {
            const config = estadoConfig[fase.estado as Estado];

            return (
              <motion.div
                key={index}
                initial={rm ? false : { opacity: 0, y: 40 }}
                animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
                }}
                className="relative rounded-2xl p-8"
                style={{
                  border: `1px solid ${config.cardBorder}`,
                  background: config.cardBg,
                  marginTop: index === 0 ? 0 : index === 1 ? '1.5rem' : '3rem',
                  boxShadow: config.scale
                    ? '0 4px 32px rgba(26,26,26,0.06)'
                    : 'none',
                }}
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
                  style={{
                    border: `1px solid ${config.badgeBorder}`,
                    background: config.badgeBg,
                    color: config.badgeText,
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`}
                    style={{ background: config.dotColor }}
                  />
                  {config.label}
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {fase.titulo}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {fase.descripcion}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {fase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span
                        className="mt-0.5 shrink-0 font-bold"
                        style={{ color: config.checkColor }}
                      >
                        ✓
                      </span>
                      <span style={{ color: config.textColor }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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