'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  status: string;
  statusNote: string | null;
  isRecurring: boolean;
  startDate: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  isFree: boolean;
  whatsappMessage: string | null;
  provider: {
    name: string;
    whatsapp: string | null;
  } | null;
  categories: Array<{
    category: { id: string; name: string };
  }>;
}

interface ActivityCardProps {
  activity: Activity;
  destinoSlug: string;
}

const STATUS_CONFIG: Record<string, {
  label: string;
  color: string;
  bg: string;
  border: string;
  pulse: boolean;
}> = {
  OPERATING: {
    label: 'Operando',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    pulse: true,
  },
  LIMITED: {
    label: 'Cupo limitado',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
    pulse: true,
  },
  CLOSED: {
    label: 'Cerrado',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.2)',
    pulse: false,
  },
  SOLD_OUT: {
    label: 'Sin cupos',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.2)',
    pulse: false,
  },
};

function formatPrice(from: number | null, to: number | null, isFree: boolean) {
  if (isFree) return 'Gratis';
  if (!from) return 'Consultar';
  const toNum = to ? Number(to) : null;
  if (!toNum || Number(from) === toNum) return `$${Number(from).toLocaleString()}`;
  return `Desde $${Number(from).toLocaleString()}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function ActivityCard({ activity, destinoSlug }: ActivityCardProps) {
  const [pressed, setPressed] = useState(false);
  const statusConfig = STATUS_CONFIG[activity.status];
  const isClosed = activity.status === 'CLOSED' || activity.status === 'SOLD_OUT';

  const handleWhatsAppClick = () => {
    if (!activity.provider?.whatsapp) return;
    const number = activity.provider.whatsapp.replace(/\D/g, '');
    const message = activity.whatsappMessage || `Hola! Vi tu actividad "${activity.title}" en Andén y me gustaría saber más.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Link
      href={`/${destinoSlug}/${activity.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        opacity: isClosed ? 0.6 : 1,
      }}
    >
      {/* Top accent — color del estado */}
      {statusConfig && (
        <div
          className="h-px w-full"
          style={{ background: statusConfig.color, opacity: 0.4 }}
        />
      )}

      <div className="flex flex-col flex-1 p-6 gap-4">

        {/* Header — estado + tipo */}
        <div className="flex items-start justify-between gap-3">
          {statusConfig && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
              style={{
                color: statusConfig.color,
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.border}`,
              }}
            >
              {statusConfig.pulse ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: statusConfig.color }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: statusConfig.color }}
                  />
                </span>
              ) : (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statusConfig.color }}
                />
              )}
              {statusConfig.label}
            </span>
          )}

          {/* Tipo badge */}
          <span
            className="text-xs px-2 py-0.5 rounded-full shrink-0"
            style={{
              color: 'rgba(255,255,255,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {activity.isRecurring ? 'Recurrente' : 'Eventual'}
          </span>
        </div>

        {/* Título */}
        <div>
          <h3
            className="font-bold text-white leading-snug mb-1 group-hover:text-turquoise transition-colors duration-200"
          >
            {activity.title}
          </h3>
          {activity.provider && (
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {activity.provider.name}
            </p>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {activity.shortDescription}
        </p>

        {/* Fecha si es eventual */}
        {!activity.isRecurring && activity.startDate && (
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
            <span>{formatDate(activity.startDate)}</span>
          </div>
        )}

        {/* Nota de estado */}
        {activity.statusNote && (
          <p
            className="text-xs italic leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {activity.statusNote}
          </p>
        )}

        {/* Categorías */}
        {activity.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activity.categories.slice(0, 2).map(({ category }) => (
              <span
                key={category.id}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer — precio + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-sm font-semibold" style={{ color: '#00D9C0' }}>
            {formatPrice(activity.priceFrom, activity.priceTo, activity.isFree)}
          </span>

          {activity.provider?.whatsapp && !isClosed ? (
            <button
              onClick={handleWhatsAppClick}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              className="cursor-pointer text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: pressed ? 'rgba(0,217,192,0.2)' : 'rgba(0,217,192,0.1)',
                border: '1px solid rgba(0,217,192,0.3)',
                color: '#00D9C0',
                transform: pressed ? 'scale(0.97)' : 'scale(1)',
              }}
            >
              Consultar →
            </button>
          ) : (
            <span
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {isClosed ? 'No disponible' : 'Sin contacto'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}