// src/app/(public)/destination-card.tsx
// Server Component

import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

export type DestinationCardData = {
  slug: string
  name: string
  province: string
  heroImageUrl: string | null
  operatingCount: number
  totalCount: number
}

// ─── Gradientes por destino ───────────────────────────────────────────────────

const DEST_GRADIENT: Record<string, string> = {
  'puerto-madryn':
    'linear-gradient(135deg,#0D3B5A 0%,#1A6B8A 35%,#0E9AA7 65%,#1A3A4A 100%)',
  'la-plata':
    'linear-gradient(135deg,#2D1B4E 0%,#4E2D8A 35%,#6B4EA8 65%,#1A0D2E 100%)',
  default:
    'linear-gradient(135deg,#1A2D4E 0%,#2D4E6B 35%,#4E6B8A 65%,#0D1B2A 100%)',
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function DestinationCard({
  slug,
  name,
  province,
  heroImageUrl,
  operatingCount,
  totalCount,
}: DestinationCardData) {
  const gradient = DEST_GRADIENT[slug] ?? DEST_GRADIENT.default

  return (
    <Link
      href={`/${slug}`}
      className="group block relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1"
    >
      {/* Fondo */}
      {heroImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ background: gradient }}
          aria-hidden
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 60%)',
        }}
        aria-hidden
      />

      {/* Body */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[10px] uppercase tracking-[0.08em] text-white/40 mb-1">
          {province}
        </p>
        <h3
          className="text-xl font-bold text-cream tracking-[-0.02em] mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          {/* Badge operando */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2.5 py-1">
            <span className="size-[5px] rounded-full bg-emerald-400 shrink-0" />
            {operatingCount > 0
              ? `${operatingCount} operando ahora`
              : `${totalCount} actividades`}
          </div>

          <span className="text-[11px] font-medium text-white/40 group-hover:text-white/70 transition-colors duration-150">
            Explorar →
          </span>
        </div>
      </div>
    </Link>
  )
}
