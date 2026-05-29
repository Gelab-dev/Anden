import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { WhatsAppButton } from './whatsapp-button';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ destinoSlug: string; actividadSlug: string }>;
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps) {
  const { destinoSlug, actividadSlug } = await params;
  const destino = await prisma.destination.findUnique({ where: { slug: destinoSlug } });
  if (!destino) return {};
  const actividad = await prisma.activity.findUnique({
    where: { destinationId_slug: { destinationId: destino.id, slug: actividadSlug } },
    include: { media: { orderBy: { order: 'asc' }, take: 1 } },
  });
  if (!actividad) return {};
  return {
    title: `${actividad.title} — ${destino.name} · Andén`,
    description: actividad.shortDescription,
    openGraph: {
      title: `${actividad.title} — Andén`,
      description: actividad.shortDescription,
      images: actividad.media[0] ? [actividad.media[0].url] : [],
    },
  };
}

// ─── Config de estados ────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, {
  label: string;
  color: string;
  bg: string;
  border: string;
  pulse: boolean;
}> = {
  OPERATING: { label: 'Operando',      color: '#10B981', bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.35)', pulse: true  },
  LIMITED:   { label: 'Cupo limitado', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.35)', pulse: true  },
  CLOSED:    { label: 'Cerrado',       color: '#EF4444', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',  pulse: false },
  SOLD_OUT:  { label: 'Sin cupos',     color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.35)', pulse: false },
  SCHEDULED: { label: 'Próximamente',  color: '#3B82F6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)', pulse: false },
};

// ─── Gradientes de fallback ───────────────────────────────────────────────────

const TYPE_GRADIENT: Record<string, string> = {
  EXCURSION:         'linear-gradient(135deg,#0D3B5A 0%,#1A6B8A 40%,#0E9AA7 100%)',
  CULTURAL_EVENT:    'linear-gradient(135deg,#2D1B4E 0%,#6B2D6B 45%,#C4534A 100%)',
  EXHIBITION:        'linear-gradient(135deg,#1A2D4E 0%,#2D4E6B 45%,#4E6B8A 100%)',
  ATTRACTION:        'linear-gradient(135deg,#0D2A1A 0%,#1A5C35 45%,#2D8A50 100%)',
  WORKSHOP:          'linear-gradient(135deg,#3A2D1A 0%,#6B4E2D 45%,#8A6B4E 100%)',
  FESTIVAL:          'linear-gradient(135deg,#4A2700 0%,#C47A27 40%,#E8A845 100%)',
  GASTRONOMIC_EVENT: 'linear-gradient(135deg,#3A1A00 0%,#8A4E2D 40%,#C47A4E 100%)',
  NIGHTLIFE_EVENT:   'linear-gradient(135deg,#1A0D2A 0%,#4E2D6B 40%,#8A4E8A 100%)',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(from: number | null, to: number | null, isFree: boolean) {
  if (isFree) return 'Gratis';
  if (!from) return 'Consultar precio';
  const toNum = to ? Number(to) : null;
  if (!toNum || Number(from) === toNum) return `$${Number(from).toLocaleString('es-AR')}`;
  return `$${Number(from).toLocaleString('es-AR')} — $${toNum.toLocaleString('es-AR')}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

// ─── Íconos inline ───────────────────────────────────────────────────────────

function IconCalendar() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5, flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5, flexShrink: 0 }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconRepeat() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5, flexShrink: 0 }}>
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ActividadPage({ params }: PageProps) {
  const { destinoSlug, actividadSlug } = await params;

  const destino = await prisma.destination.findUnique({
    where: { slug: destinoSlug },
  });
  if (!destino) notFound();

  const actividad = await prisma.activity.findUnique({
    where: { destinationId_slug: { destinationId: destino.id, slug: actividadSlug } },
    include: {
      provider: true,
      destination: true,
      categories: { include: { category: true } },
      media: { orderBy: { order: 'asc' } },
    },
  });

  if (!actividad || !actividad.isPublished) notFound();

  const statusConfig = STATUS_CONFIG[actividad.status] ?? STATUS_CONFIG.OPERATING;
  const isClosed = actividad.status === 'CLOSED' || actividad.status === 'SOLD_OUT';
  const scheduleData = actividad.schedule as { texto?: string } | null;
  const coverImage = actividad.media[0] ?? null;
  const galleryImages = actividad.media.slice(1);
  const gradient = TYPE_GRADIENT[actividad.activityType] ?? TYPE_GRADIENT.EXCURSION;
  const price = formatPrice(
    actividad.priceFrom ? Number(actividad.priceFrom) : null,
    actividad.priceTo ? Number(actividad.priceTo) : null,
    actividad.isFree
  );
  const whatsappMessage = actividad.whatsappMessage
    ?? `Hola! Vi "${actividad.title}" en Andén y me gustaría saber más.`;

  // Pills de info
  const infoPills = [
    actividad.startDate && {
      icon: <IconCalendar />,
      text: actividad.endDate
        ? `${formatDateShort(actividad.startDate)} — ${formatDateShort(actividad.endDate)}`
        : formatDateShort(actividad.startDate),
      mono: true,
    },
    scheduleData?.texto && { icon: <IconClock />, text: scheduleData.texto, mono: true },
    actividad.maxCapacity && { icon: <IconUsers />, text: `${actividad.maxCapacity} personas`, mono: true },
    { icon: <IconRepeat />, text: actividad.isRecurring ? 'Actividad recurrente' : 'Evento con fecha' },
  ].filter(Boolean) as { icon: React.ReactNode; text: string; mono?: boolean }[];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-board)' }}>

      {/* ── Hero ── */}
      <div
        className="relative w-full overflow-hidden flex flex-col justify-end"
        style={{ height: 'clamp(380px, 55vh, 560px)' }}
      >
        {/* Fondo */}
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage.url}
            alt={actividad.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}

        {/* Fades */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,27,42,0.05) 0%, rgba(13,27,42,0.98) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.65) 0%, transparent 55%)' }} />

        {/* Breadcrumb */}
        <div className="absolute top-5 left-0 right-0 px-6 md:px-12">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Link href="/" className="hover:text-white transition-colors cursor-pointer">Inicio</Link>
            <span>/</span>
            <Link href={`/${destino.slug}`} className="hover:text-white transition-colors cursor-pointer">{destino.name}</Link>
            <span>/</span>
            <span className="truncate max-w-[180px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{actividad.title}</span>
          </div>
        </div>

        {/* Contenido hero */}
        <div className="relative z-10 px-6 md:px-12 pb-10">
          <div className="max-w-5xl mx-auto">

            {/* Badge estado */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
                style={{ color: statusConfig.color, background: statusConfig.bg, border: `0.5px solid ${statusConfig.border}` }}
              >
                {statusConfig.pulse ? (
                  <span className="relative flex size-[6px]">
                    <span className="animate-ping absolute inline-flex size-full rounded-full opacity-75" style={{ background: statusConfig.color }} />
                    <span className="relative inline-flex size-[6px] rounded-full" style={{ background: statusConfig.color }} />
                  </span>
                ) : (
                  <span className="size-[6px] rounded-full" style={{ background: statusConfig.color }} />
                )}
                {statusConfig.label}
              </span>
              {actividad.statusNote && (
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>· {actividad.statusNote}</span>
              )}
            </div>

            {/* Título */}
            <h1
              className="font-black tracking-[-0.03em] text-cream mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.04,
                textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              }}
            >
              {actividad.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span>{destino.name}</span>
              {actividad.provider && <><span>·</span><span>{actividad.provider.name}</span></>}
              <span>·</span>
              <span className="font-semibold tabular" style={{ color: 'var(--color-signal)' }}>{price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-[1fr_288px] gap-12 items-start">

          {/* ── Columna principal ── */}
          <div>

            {/* Descripción */}
            <p
              className="text-lg leading-relaxed mb-4 italic"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {actividad.shortDescription}
            </p>
            {actividad.longDescription && (
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {actividad.longDescription}
              </p>
            )}

            {/* Detalles como pills */}
            {infoPills.length > 0 && (
              <div className="mt-10 pt-8" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Detalles
                </p>
                <div className="flex flex-wrap gap-2">
                  {infoPills.map((pill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {pill.icon}
                      <span className={pill.mono ? 'tabular' : ''}>{pill.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categorías */}
            {actividad.categories.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {actividad.categories.map(({ category }: { category: { id: string; name: string } }) => (
                  <span
                    key={category.id}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ color: 'rgba(255,255,255,0.3)', border: '0.5px solid rgba(255,255,255,0.08)' }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Galería */}
            {galleryImages.length > 0 && (
              <div className="mt-10 pt-8" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Galería
                </p>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                  {galleryImages.map((img) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.altText ?? actividad.title}
                      className="w-full rounded-lg object-cover"
                      style={{ aspectRatio: '4/3' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Prestador */}
            {actividad.provider && (
              <div
                className="mt-10 pt-8 flex items-start gap-4"
                style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="size-11 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-base font-bold"
                  style={{
                    background: actividad.provider.logoUrl ? 'transparent' : 'linear-gradient(135deg,#C4956A,#8A5A3A)',
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {actividad.provider.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={actividad.provider.logoUrl} alt={actividad.provider.name} className="w-full h-full object-cover" />
                  ) : (
                    actividad.provider.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white mb-1">{actividad.provider.name}</p>
                  {actividad.provider.bio && (
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {actividad.provider.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Volver */}
            <div className="mt-10 pt-8" style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
              <Link
                href={`/${destino.slug}`}
                className="text-sm transition-colors cursor-pointer hover:text-white"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                ← Volver a {destino.name}
              </Link>
            </div>
          </div>

          {/* ── Sidebar sticky ── */}
          <div className="hidden md:block">
            <div
              className="sticky top-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}
            >
              <div className="p-6 space-y-4">

                {/* Precio */}
                <div>
                  <p className="text-xs tracking-[0.08em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    Precio por persona
                  </p>
                  <p
                    className="text-3xl font-black tracking-[-0.03em] tabular"
                    style={{ color: '#F5F0E8' }}
                  >
                    {price}
                  </p>
                </div>

                {/* Estado */}
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
                  style={{ background: statusConfig.bg, border: `0.5px solid ${statusConfig.border}` }}
                >
                  <span className="size-[6px] rounded-full shrink-0" style={{ background: statusConfig.color }} />
                  <span className="text-sm font-medium" style={{ color: statusConfig.color }}>
                    {statusConfig.label}
                  </span>
                  {actividad.statusNote && (
                    <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      · {actividad.statusNote}
                    </span>
                  )}
                </div>

                {/* Fecha o horario */}
                {(actividad.startDate || scheduleData?.texto) && (
                  <div
                    className="pt-4 space-y-3"
                    style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
                  >
                    {actividad.startDate && (
                      <div>
                        <p className="text-xs tracking-[0.06em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                          Fecha
                        </p>
                        <p className="text-sm capitalize tabular" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {formatDate(actividad.startDate)}
                        </p>
                      </div>
                    )}
                    {scheduleData?.texto && (
                      <div>
                        <p className="text-xs tracking-[0.06em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                          Horarios
                        </p>
                        <p className="text-sm tabular" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {scheduleData.texto}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="pt-2" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
                  {!isClosed && actividad.provider?.whatsapp ? (
                    <>
                      <WhatsAppButton
                        whatsapp={actividad.provider.whatsapp}
                        message={whatsappMessage}
                      />
                      <p className="text-xs text-center mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        Contacto directo · sin intermediarios
                      </p>
                    </>
                  ) : (
                    <div
                      className="text-center py-3 rounded-lg text-sm"
                      style={{ color: 'rgba(255,255,255,0.3)', border: '0.5px solid rgba(255,255,255,0.08)' }}
                    >
                      No disponible en este momento
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA móvil fixed ── */}
      {!isClosed && actividad.provider?.whatsapp && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-50"
          style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.98) 60%, transparent)' }}
        >
          <WhatsAppButton whatsapp={actividad.provider.whatsapp} message={whatsappMessage} />
        </div>
      )}
    </div>
  );
}
