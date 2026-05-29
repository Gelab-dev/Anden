'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { depth } from 'three/src/nodes/display/ViewportDepthNode.js';

// ─── Data de las cards (hardcodeada — es un mockup visual) ───────────────────

const CARDS = [
  {
    id: 'a',
    title: 'Avistaje de ballenas francas australes',
    provider: 'Patagonia Explorers',
    location: 'Puerto Madryn',
    date: 'dom. 1 jun',
    status: 'Operando',
    statusColor: '#10B981',
    statusBg: 'rgba(16,185,129,0.12)',
    statusBorder: 'rgba(16,185,129,0.3)',
    consultas: 14,
    gradient: 'linear-gradient(135deg,#0D3B5A 0%,#1A6B8A 40%,#0E9AA7 100%)',
  },
  {
    id: 'b',
    title: 'Feria Gastronómica en Ciudad Vieja',
    provider: 'Ciudad Vieja Events',
    location: 'La Plata',
    date: 'sáb. 31 may',
    status: 'Cupo limitado',
    statusColor: '#F59E0B',
    statusBg: 'rgba(245,158,11,0.12)',
    statusBorder: 'rgba(245,158,11,0.3)',
    consultas: 7,
    gradient: 'linear-gradient(135deg,#4A2700 0%,#C47A27 40%,#E8A845 100%)',
  },
  {
    id: 'c',
    title: 'Tour Guiado por el Centro Histórico',
    provider: 'City Tours BA',
    location: 'La Plata',
    date: 'lun. 2 jun',
    status: 'Operando',
    statusColor: '#10B981',
    statusBg: 'rgba(16,185,129,0.12)',
    statusBorder: 'rgba(16,185,129,0.3)',
    consultas: 3,
    gradient: 'linear-gradient(135deg,#2D1B4E 0%,#4E2D8A 40%,#6B4EA8 100%)',
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export function MockupFeed() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative h-full w-full flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d' as const,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: {
            duration: 7,
            ease: 'easeInOut' as MotionTransition['ease'],
            repeat: Infinity,
          },
        }}
        className="relative w-[320px]"
      >
        
      {/* Card de atrás */}
      <div
        className="absolute w-full"
        style={{
          top: '-40px',
          left: '40px',
          transform: 'rotate(5deg)',
          zIndex: 0,
        }}
      >
        <ActivityCard card={CARDS[2]} depth={2} />
      </div>

      {/* Card del medio */}
      <div
        className="absolute w-full"
        style={{
          top: '-20px',
          left: '14px',
          transform: 'rotate(2.5deg)',
          zIndex: 1,
        }}
      >
        <ActivityCard card={CARDS[1]} depth={1} />
      </div>

      {/* Card de adelante */}
      <div
        className="relative"
        style={{
          transform: 'rotate(-1.5deg)',
          zIndex: 2,
        }}
      >
        <ActivityCard card={CARDS[0]} depth={0} />
      </div>

        {/* Notificación flotante */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="absolute -bottom-6 -right-6 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
          style={{
            background: 'rgba(26,26,26,0.65)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: 2,
          }}
        >
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(37,211,102,0.15)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: '#EDEBE8', lineHeight: 1.2 }}>
              Nueva consulta
            </p>
            <p className="text-[10px]" style={{ color: 'rgba(237,235,232,0.45)' }}>
              hace 2 minutos
            </p>
          </div>
        </motion.div>

        {/* Badge de vistas */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
          className="absolute -top-5 -left-8 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: 'rgba(26,26,26,0.65)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            zIndex: 2,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
            14 vistas hoy
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Activity Card ────────────────────────────────────────────────────────────

function ActivityCard({
  card,
  depth = 0,
}: {
  card: typeof CARDS[0];
  depth?: 0 | 1 | 2;
}) {
  const shadows = {
    0: '0 24px 64px rgba(0,0,0,0.35), 0 -8px 24px rgba(0,0,0,0.15)',
    1: '0 8px 32px rgba(0,0,0,0.25)',
    2: '0 4px 16px rgba(0,0,0,0.15)',
  }
  const opacities = { 0: 1, 1: 0.7, 2: 0.45 }
  const shadow = shadows[depth]
  const opacity = opacities[depth]

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#1C1C1A',
        border: '0.5px solid rgba(255,255,255,0.1)',
        boxShadow: shadow,
        opacity: opacity, 
      }}
    >
      {/* Imagen */}
      <div
        className="relative w-full"
        style={{ aspectRatio: '16/9', background: card.gradient }}
      >
        {/* Fade inferior */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,26,0.9) 100%)',
          }}
        />
        {/* Badge estado */}
        <div
          className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
          style={{
            background: card.statusBg,
            border: `0.5px solid ${card.statusBorder}`,
            color: card.statusColor,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="size-[5px] rounded-full shrink-0"
            style={{ background: card.statusColor }}
          />
          {card.status}
        </div>
        {/* Badge ubicación */}
        <div
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full text-[10px]"
          style={{
            background: 'rgba(0,0,0,0.45)',
            color: 'rgba(255,255,255,0.55)',
            border: '0.5px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {card.location}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4">
        <p
          className="text-[10px] uppercase tracking-[0.07em] mb-1"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {card.provider}
        </p>
        <h3
          className="text-base font-bold leading-snug mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F5F0E8',
            letterSpacing: '-0.01em',
          }}
        >
          {card.title}
        </h3>
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            — {card.date}
          </span>
          <div
            className="inline-flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full"
            style={{
              color: 'var(--color-whatsapp)',
              background: 'rgba(37,211,102,0.07)',
              border: '0.5px solid rgba(37,211,102,0.3)',
            }}
          >
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.522 5.84L.057 23.852a.5.5 0 00.602.6l6.05-1.457A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-4.98-1.36l-.357-.211-3.705.893.92-3.625-.232-.371A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Contactar
          </div>
        </div>
      </div>
    </div>
  );
}
