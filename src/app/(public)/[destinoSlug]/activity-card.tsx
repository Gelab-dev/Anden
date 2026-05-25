// src/app/(public)/[destinoSlug]/activity-card.tsx
// Server Component — sin 'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ActivityStatus, ActivityType } from '@prisma/client'

// ─── Tipo que el page.tsx debe proveer al card ───────────────────────────────

export type ActivityCardData = {
  id: string
  slug: string
  title: string
  shortDescription: string
  status: ActivityStatus
  statusNote: string | null
  activityType: ActivityType
  isRecurring: boolean
  startDate: Date | null
  endDate: Date | null
  whatsappMessage: string | null
  provider: {
    name: string
    whatsapp: string | null
  } | null
  media: {
    url: string
    altText: string | null
    order: number
  }[]
}

type Props = {
  activity: ActivityCardData
  destinoSlug: string
}

// ─── Configuración de estados ────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ActivityStatus,
  { label: string; badge: string; dot: string }
> = {
  OPERATING: {
    label: 'Operando',
    badge: 'bg-black/50 border-emerald-500/40 text-emerald-400',
    dot: 'bg-emerald-400',
  },
  LIMITED: {
    label: 'Cupo limitado',
    badge: 'bg-amber-500/18 border-amber-500/40 text-amber-400',
    dot: 'bg-amber-400',
  },
  CLOSED: {
    label: 'Cerrado',
    badge: 'bg-red-500/18 border-red-500/40 text-red-400',
    dot: 'bg-red-400',
  },
  SOLD_OUT: {
    label: 'Sin cupos',
    badge: 'bg-red-500/18 border-red-500/40 text-red-400',
    dot: 'bg-red-400',
  },
  SCHEDULED: {
    label: 'Próximamente',
    badge: 'bg-blue-500/18 border-blue-500/40 text-blue-400',
    dot: 'bg-blue-400',
  },
}

// ─── Gradientes de fallback (cuando no hay foto) ─────────────────────────────
// Un color por tipo de actividad — identidad visual sin imagen

const TYPE_GRADIENT: Record<ActivityType, string> = {
  EXCURSION:
    'linear-gradient(135deg,#0D3B5A 0%,#1A6B8A 40%,#0E9AA7 70%,#1A3A4A 100%)',
  CULTURAL_EVENT:
    'linear-gradient(135deg,#2D1B4E 0%,#6B2D6B 45%,#C4534A 75%,#1A0D2E 100%)',
  EXHIBITION:
    'linear-gradient(135deg,#1A2D4E 0%,#2D4E6B 45%,#4E6B8A 75%,#0D1B2A 100%)',
  ATTRACTION:
    'linear-gradient(135deg,#0D2A1A 0%,#1A5C35 45%,#2D8A50 75%,#0D1A0D 100%)',
  WORKSHOP:
    'linear-gradient(135deg,#3A2D1A 0%,#6B4E2D 45%,#8A6B4E 75%,#1A0D00 100%)',
  FESTIVAL:
    'linear-gradient(135deg,#4A2700 0%,#C47A27 40%,#E8A845 65%,#5C3000 100%)',
  GASTRONOMIC_EVENT:
    'linear-gradient(135deg,#3A1A00 0%,#8A4E2D 40%,#C47A4E 65%,#5C2D00 100%)',
  NIGHTLIFE_EVENT:
    'linear-gradient(135deg,#1A0D2A 0%,#4E2D6B 40%,#8A4E8A 65%,#2D0D3A 100%)',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(startDate: Date | null, endDate: Date | null): string | null {
  if (!startDate) return null

  const fmt = new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  const start = fmt.format(startDate)
  if (!endDate) return `— ${start}`

  const end = fmt.format(endDate)
  return `— ${start} al ${end}`
}

function buildWhatsappUrl(whatsapp: string, title: string, customMessage: string | null): string {
  const number = whatsapp.replace(/\D/g, '')
  const message =
    customMessage ?? `Hola, vi "${title}" en Andén y me gustaría consultar.`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ActivityCard({ activity, destinoSlug }: Props) {
  const statusCfg = STATUS_CONFIG[activity.status]
  const isClosed = activity.status === 'CLOSED' || activity.status === 'SOLD_OUT'

  // Primera imagen por orden; si no hay (o no se incluyó en el query) → gradiente
  const coverMedia = (activity.media ?? []).sort((a, b) => a.order - b.order)[0] ?? null

  const dateStr = formatDate(activity.startDate, activity.endDate)
  const recurrenceLabel = activity.isRecurring ? 'Recurrente' : 'Eventual'

  const whatsappUrl =
    activity.provider?.whatsapp && !isClosed
      ? buildWhatsappUrl(
          activity.provider.whatsapp,
          activity.title,
          activity.whatsappMessage,
        )
      : null

  const detailHref = `/${destinoSlug}/${activity.slug}`

  return (
    <article
      className={[
        'group rounded-2xl overflow-hidden flex flex-col',
        'bg-[#1C1C1A] border border-white/8',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1 hover:border-white/14',
        isClosed ? 'opacity-60' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* ── Imagen ── */}
      <Link href={detailHref} className="block relative aspect-video overflow-hidden cursor-pointer">
        {coverMedia ? (
          <Image
            src={coverMedia.url}
            alt={coverMedia.altText ?? activity.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: TYPE_GRADIENT[activity.activityType] }}
          />
        )}

        {/* Fade hacia el body */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-[#1C1C1A]/90"
        />

        {/* Fade superior — NUEVO, protege los badges */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-transparent from-60% to-black/50"
        />

        {/* Badge de estado — esquina superior izquierda */}
        <div
          className={[
            'absolute top-2.5 left-2.5',
            'flex items-center gap-1.5 px-2.5 py-1',
            'rounded-full border text-[11px] font-medium',
            'bg-black/50 shadow-sm',
            'backdrop-blur-sm',
            statusCfg.badge,
          ].join(' ')}
        >
          <span className={`size-[5px] rounded-full shrink-0 ${statusCfg.dot}`} />
          {statusCfg.label}
        </div>

        {/* Badge de tipo — esquina superior derecha */}
        <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.06em] text-white/50 bg-black/50 border border-white/12 backdrop-blur-sm shadow-sm">
          {recurrenceLabel}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col flex-1">
        {/* Nombre del prestador */}
        {activity.provider && (
          <p className="text-[11px] text-white/35 uppercase tracking-[0.07em] mb-1">
            {activity.provider.name}
          </p>
        )}

        {/* Título en Playfair */}
        <Link href={detailHref} className="block cursor-pointer">
          <h3 className="font-playfair text-lg font-bold text-cream leading-snug tracking-[-0.02em] mb-2 line-clamp-2">
            {activity.title}
          </h3>
        </Link>

        {/* Descripción corta */}
        <p className="text-xs text-white/45 leading-relaxed mb-3.5 line-clamp-2">
          {activity.shortDescription}
        </p>

        {/* Footer: fecha + CTA */}
        <div className="border-t border-white/6 pt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-2 mt-auto">
          {/* Fecha / frecuencia */}
          <span className="text-[11px] text-white/30 shrink-0">
            {dateStr ?? (activity.isRecurring ? 'Recurrente' : null)}
          </span>

          {/* CTA principal */}
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'text-xs font-medium shrink-0 cursor-pointer',
                'px-3 py-1.5 rounded-full',
                'text-[#00D9C0] border border-[#00D9C0]/30 bg-[#00D9C0]/7',
                'transition-all duration-180 ease-out',
                'hover:bg-[#00D9C0] hover:text-[#0D1B2A] hover:border-[#00D9C0] hover:scale-[1.04]',
              ].join(' ')}
            >
              Contactar →
            </a>
          ) : (
            <Link
              href={detailHref}
              className={[
                'text-xs font-medium shrink-0 cursor-pointer',
                'px-3 py-1.5 rounded-full',
                'text-white/30 border border-white/10',
                'transition-colors duration-150',
                'hover:text-white/50',
              ].join(' ')}
            >
              Ver detalle →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
