'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  destinationName: string
  destinationSlug: string
  province: string
  heroImageUrl: string | null
  operatingCount: number
  totalCount: number
}

// ─── Animaciones ─────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as MotionProps['transition'] extends { ease?: infer E } ? E : never

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
}

// ─── Hook: contador animado ───────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 700) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (target === 0) return
    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [target, duration])

  return count
}

// ─── Hook: hora local actualizada cada minuto ─────────────────────────────────

function useLocalTime() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  )

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    // Sincronizar con el próximo minuto exacto
    const msToNextMinute = (60 - new Date().getSeconds()) * 1000
    const timeout = setTimeout(() => {
      setTime(fmt.format(new Date()))
      const interval = setInterval(() => setTime(fmt.format(new Date())), 60_000)
      return () => clearInterval(interval)
    }, msToNextMinute)

    return () => clearTimeout(timeout)
  }, [])

  return time
}

// ─── Gradiente de fallback por destino ───────────────────────────────────────

const DEST_GRADIENT: Record<string, string> = {
  'puerto-madryn':
    'linear-gradient(135deg,#0D3B5A 0%,#1A6B8A 40%,#0E9AA7 70%,#0d1b2a 100%)',
  'la-plata':
    'linear-gradient(135deg,#2D1B4E 0%,#4E2D8A 40%,#6B4EA8 70%,#0d1b2a 100%)',
  default:
    'linear-gradient(135deg,#0D1B2A 0%,#1A3B5A 40%,#2D6B8A 70%,#0d1b2a 100%)',
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function HeroSection({
  destinationName,
  destinationSlug,
  province,
  heroImageUrl,
  operatingCount,
  totalCount,
}: Props) {
  const time = useLocalTime()
  const animatedCount = useAnimatedCounter(operatingCount, 700)
  const gradient = DEST_GRADIENT[destinationSlug] ?? DEST_GRADIENT.default

  return (
    <section className="relative min-h-[480px] flex items-end overflow-hidden">

      {/* Fondo: imagen real o gradiente */}
      {heroImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImageUrl}
          alt={destinationName}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: gradient }}
          aria-hidden
        />
      )}

      {/* Capa 1: fade vertical — garantiza contraste en la zona del texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.92) 100%)',
        }}
        aria-hidden
      />

      {/* Capa 2: fade lateral — texto izquierdo sobre zona casi sólida */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.4) 50%, transparent 100%)',
        }}
        aria-hidden
      />

      {/* Contenido */}
      <motion.div
        className="relative z-10 px-6 md:px-12 pt-16 pb-12 max-w-2xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2.5 mb-4"
          variants={fadeIn}
        >
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-[var(--color-signal)] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-signal)]" />
          </span>
          <span className="text-[11px] font-medium tracking-widestuppercase text-[var(--color-signal)]">
            {province} · En vivo
          </span>
        </motion.div>

        {/* Hora local */}
        <motion.p
          className="text-sm text-white/40 italic mb-3"
          variants={fadeUp}
        >
          Son las {time} en {destinationName}.
        </motion.p>

        {/* Título */}
        <motion.h1 variants={fadeUp}>
          <span
            className="block font-black tracking-[-0.03em] text-cream leading-[1.02]"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}
          >
            {destinationName},
          </span>
          <span
            className="block font-black tracking-[-0.03em] text-[var(--color-signal)] leading-[1.02] italic"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
            }}
          >
            en tiempo real.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-sm text-white/50 leading-relaxed mt-4 mb-7 max-w-md"
          variants={fadeUp}
        >
          Actividades y eventos actualizados por quienes los organizan.
        </motion.p>

        {/* Stat + CTA */}
        <motion.div
          className="flex flex-wrap items-center gap-3"
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-signal)]/8 border border-[var(--color-signal)]/20 rounded-full px-4 py-2 text-sm text-white/70">
            <span className="size-[5px] rounded-full bg-emerald-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">{animatedCount}</strong>
              {' '}operando ahora
              {totalCount > 0 && (
                <span className="text-white/40"> · {totalCount} en total</span>
              )}
            </span>
          </div>

          <Link
            href={`/${destinationSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-signal)] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Ver qué está pasando
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
