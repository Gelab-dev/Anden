'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { comoFuncionaData } from '../data/landing.data';

export function ComoFuncionaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const rm = useReducedMotion();

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: 'var(--color-cream-2)' }}
    >
      {/* Borde superior */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'rgba(26,26,26,0.08)' }}
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-start">

        {/* Columna izquierda — header fijo */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          animate={rm || isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="md:sticky md:top-32"
        >
          <span
            className="text-xs font-mono tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Cómo funciona
          </span>
          <h2
            className="mt-4 font-black leading-none tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: 'var(--color-ink)',
            }}
          >
            {comoFuncionaData.headline}
          </h2>
          <p
            className="mt-6 text-base leading-relaxed max-w-sm"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            En menos de 5 minutos tu negocio aparece en el feed de tu ciudad.
          </p>
        </motion.div>

        {/* Columna derecha — pasos */}
        <div className="relative">
          {/* Línea conectora */}
          <motion.div
            initial={rm ? false : { scaleY: 0 }}
            animate={rm || isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
            }}
            className="absolute left-5.5 top-8 bottom-8 w-px origin-top"
            style={{ background: 'rgba(26,26,26,0.12)' }}
          />

          <div className="space-y-0">
            {comoFuncionaData.pasos.map((paso, index) => (
              <motion.div
                key={index}
                initial={rm ? false : { opacity: 0, x: 24 }}
                animate={rm || isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'],
                }}
                className="group relative flex gap-8 pb-14 last:pb-0"
              >
                {/* Círculo numerado */}
                <div className="relative z-10 shrink-0 mt-1">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: '1px solid rgba(26,26,26,0.15)',
                      background: 'var(--color-cream-2)',
                    }}
                  >
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {paso.paso}
                    </span>
                  </div>
                  {/* Dot sand al hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ border: '1px solid var(--color-signal)' }}
                  />
                </div>

                {/* Contenido */}
                <div className="pt-2">
                  <h3
                    className="text-lg font-bold mb-2 transition-colors duration-300"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {paso.titulo}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-ink-soft)' }}
                  >
                    {paso.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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