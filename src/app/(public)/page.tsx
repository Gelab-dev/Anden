// src/app/(public)/page.tsx
// Server Component

import { headers } from 'next/headers'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { HeroSection } from './hero-section'
import { DestinationCard } from './destination-card'
import { ActivityCard, type ActivityCardData } from './[destinoSlug]/activity-card'

// ─── Detección de destino por IP (headers de Vercel) ─────────────────────────

async function detectNearestDestination(
  activeDestinations: { slug: string; name: string }[]
) {
  const headersList = await headers()

  // Vercel inyecta estos headers automáticamente en producción
  const city = headersList.get('x-vercel-ip-city')?.toLowerCase() ?? ''
  const region = headersList.get('x-vercel-ip-country-region')?.toLowerCase() ?? ''

  // Intentar match por ciudad o región
  const matched = activeDestinations.find((d) => {
    const slug = d.slug.toLowerCase()
    const dName = d.name.toLowerCase()
    return (
      city.includes(dName) ||
      dName.includes(city) ||
      slug.includes(city.replace(/\s+/g, '-')) ||
      region.includes(dName)
    )
  })

  // Si no hay match → el destino más activo (primero en la lista)
  return matched ?? activeDestinations[0] ?? null
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Andén — La vida real de cada destino argentino',
  description:
    'Actividades, eventos y experiencias actualizados en tiempo real por quienes los organizan.',
}

export default async function HomePage() {
  // 1. Destinos activos con conteo de actividades
  const rawDestinations = await prisma.destination.findMany({
    where: { isActive: true },
    include: {
      activities: {
        where: {
          isPublished: true,
          provider: { status: 'VERIFIED' },
        },
        select: { id: true, status: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  const destinations = rawDestinations.map((d) => ({
    slug: d.slug,
    name: d.name,
    province: d.province,
    heroImageUrl: d.heroImageUrl,
    operatingCount: d.activities.filter((a) => a.status === 'OPERATING').length,
    totalCount: d.activities.length,
  }))

  // 2. Detectar destino más cercano por IP
  const nearest = await detectNearestDestination(destinations)

  // 3. Actividades destacadas para el feed del home
  const rawFeatured = await prisma.activity.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
      provider: { status: 'VERIFIED' },
    },
    include: {
      provider: { select: { name: true, whatsapp: true } },
      media: { orderBy: { order: 'asc' }, take: 1 },
      destination: { select: { name: true, slug: true } },
    },
    orderBy: [{ status: 'asc' }, { statusUpdatedAt: 'desc' }],
    take: 4,
  })

  const featuredActivities: (ActivityCardData & { destinationSlug: string; destinationName: string })[] =
    rawFeatured.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      shortDescription: a.shortDescription,
      status: a.status,
      statusNote: a.statusNote,
      activityType: a.activityType,
      isRecurring: a.isRecurring,
      startDate: a.startDate ?? null,
      endDate: a.endDate ?? null,
      whatsappMessage: a.whatsappMessage,
      provider: a.provider
        ? { name: a.provider.name, whatsapp: a.provider.whatsapp }
        : null,
      media: a.media.map((m) => ({ url: m.url, altText: m.altText, order: m.order })),
      destinationSlug: a.destination.slug,
      destinationName: a.destination.name,
    }))

  return (
    <div className="min-h-screen bg-dark-900">

      {/* ── Hero ── */}
      {nearest ? (
        <HeroSection
          destinationName={nearest.name}
          destinationSlug={nearest.slug}
          province={destinations.find((d) => d.slug === nearest.slug)?.province ?? ''}
          heroImageUrl={destinations.find((d) => d.slug === nearest.slug)?.heroImageUrl ?? null}
          operatingCount={destinations.find((d) => d.slug === nearest.slug)?.operatingCount ?? 0}
          totalCount={destinations.find((d) => d.slug === nearest.slug)?.totalCount ?? 0}
        />
      ) : (
        // Fallback: sin destinos activos todavía
        <div className="px-6 md:px-12 pt-24 pb-16 text-center">
          <p className="text-[11px] tracking-widest uppercase text-white/30 mb-4">
            Andén
          </p>
          <h1
            className="text-4xl md:text-6xl font-black text-cream tracking-[-0.03em] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            La vida real de cada<br />
            <em className="italic text-[#00D9C0]">destino argentino.</em>
          </h1>
          <p className="text-white/40 max-w-md mx-auto">
            Estamos incorporando los primeros destinos. Pronto vas a poder descubrir
            qué pasa hoy en tu ciudad.
          </p>
        </div>
      )}

      {/* ── Destinos ── */}
      {destinations.length > 0 && (
        <section className="px-6 md:px-12 py-12 border-t border-white/5">
          <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-1.5">
            Destinos disponibles
          </p>
          <h2
            className="text-2xl font-bold text-cream tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            ¿A dónde vas?
          </h2>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
          >
            {destinations.map((d) => (
              <DestinationCard key={d.slug} {...d} />
            ))}
          </div>
        </section>
      )}

      {/* ── Actividades destacadas ── */}
      {featuredActivities.length > 0 && (
        <section className="px-6 md:px-12 py-12 border-t border-white/5">
          <p className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-1.5">
            Destacadas
          </p>
          <h2
            className="text-2xl font-bold text-cream tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Lo mejor de ahora
          </h2>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {featuredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                destinoSlug={activity.destinationSlug}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Lead capture ── */}
      <section className="px-6 md:px-12 py-12 border-t border-white/5">
        <div className="rounded-2xl bg-white/3 border border-white/7 p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-2">
              / El tren todavía no llegó
            </p>
            <h3
              className="text-2xl font-bold text-cream tracking-[-0.02em] mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              ¿Tu ciudad no está en Andén?
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Avisanos dónde estás y nos aseguramos de que sea el próximo destino.
            </p>
          </div>

          <LeadCaptureForm />
        </div>
      </section>

      {/* ── Para prestadores ── */}
      <section className="px-6 md:px-12 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-widest uppercase text-white/25 mb-3">
          Para negocios
        </p>
        <h2
          className="text-2xl font-bold text-cream tracking-[-0.02em] mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          ¿Organizás actividades?
        </h2>
        <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
          Publicá en Andén y aparecé cuando alguien busca qué hacer hoy en tu ciudad.
        </p>
        <Link
          href="/comercial"
          className="inline-flex items-center gap-2 bg-sand text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#B8845A] transition-colors duration-150 cursor-pointer"
        >
          Conocé Andén para negocios →
        </Link>
      </section>

    </div>
  )
}

// ─── Lead capture form — necesita 'use client' propio ────────────────────────
// Por ahora es un componente inline. Moverlo a lead-capture-form.tsx cuando
// se conecte a una API route real.

function LeadCaptureForm() {
  // Nota: este form envía a una API route que hay que crear en /api/leads
  // Por ahora el action es un placeholder
  return (
    <form
      action="/api/leads"
      method="POST"
      className="flex gap-2 shrink-0"
    >
      <input
        type="email"
        name="email"
        placeholder="tu@email.com"
        required
        className="bg-white/5 border border-white/12 rounded-full px-4 py-2 text-sm text-white/60 placeholder:text-white/25 w-48 focus:outline-none focus:border-white/25"
      />
      <input
        type="text"
        name="city"
        placeholder="Tu ciudad"
        required
        className="bg-white/5 border border-white/12 rounded-full px-4 py-2 text-sm text-white/60 placeholder:text-white/25 w-36 focus:outline-none focus:border-white/25"
      />
      <button
        type="submit"
        className="bg-[#00D9C0] text-dark-900 text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#00c4ad] transition-colors duration-150 cursor-pointer shrink-0"
      >
        Avisame →
      </button>
    </form>
  )
}
