import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { WhatsAppButton } from './whatsapp-button';

interface PageProps {
  params: Promise<{ destinoSlug: string; actividadSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { destinoSlug, actividadSlug } = await params;
  const destino = await prisma.destination.findUnique({ where: { slug: destinoSlug } });
  if (!destino) return {};
  const actividad = await prisma.activity.findUnique({
    where: { destinationId_slug: { destinationId: destino.id, slug: actividadSlug } },
  });
  if (!actividad) return {};
  return {
    title: `${actividad.title} — ${destino.name} · Andén`,
    description: actividad.shortDescription,
  };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; pulse: boolean }> = {
  OPERATING: { label: 'Operando',      color: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  pulse: true  },
  LIMITED:   { label: 'Cupo limitado', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)',  pulse: true  },
  CLOSED:    { label: 'Cerrado',       color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)',   pulse: false },
  SOLD_OUT:  { label: 'Sin cupos',     color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.2)', pulse: false },
};

function formatPrice(from: number | null, to: number | null, isFree: boolean) {
  if (isFree) return 'Gratis';
  if (!from) return 'Consultar precio';
  const toNum = to ? Number(to) : null;
  if (!toNum || Number(from) === toNum) return `$${Number(from).toLocaleString()}`;
  return `$${Number(from).toLocaleString()} — $${toNum.toLocaleString()}`;
}

export default async function ActividadPage({ params }: PageProps) {
  const { destinoSlug, actividadSlug } = await params;

  const destino = await prisma.destination.findUnique({
    where: { slug: destinoSlug },
  });

  if (!destino) notFound();

  const actividad = await prisma.activity.findUnique({
    where: {
      destinationId_slug: {
        destinationId: destino.id,
        slug: actividadSlug,
      },
    },
    include: {
      provider: true,
      destination: true,
      categories: { include: { category: true } },
    },
  });

  if (!actividad || !actividad.isPublished) notFound();

  const statusConfig = STATUS_CONFIG[actividad.status];
  const isClosed = actividad.status === 'CLOSED' || actividad.status === 'SOLD_OUT';
  const scheduleData = actividad.schedule as { texto?: string } | null;

  return (
    <div className="min-h-screen bg-dark-900">

      {/* Breadcrumb */}
      <div
        className="px-6 md:px-12 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`/${destino.slug}`} className="hover:text-white transition-colors">{destino.name}</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{actividad.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">

        {/* Header */}
        <div className="mb-10">

          {/* Estado */}
          {statusConfig && (
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  color: statusConfig.color,
                  background: statusConfig.bg,
                  border: `1px solid ${statusConfig.border}`,
                }}
              >
                {statusConfig.pulse ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: statusConfig.color }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: statusConfig.color }} />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full" style={{ background: statusConfig.color }} />
                )}
                {statusConfig.label}
              </span>
              {actividad.statusNote && (
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  · {actividad.statusNote}
                </span>
              )}
            </div>
          )}

          {/* Título */}
          <h1
            className="font-black tracking-[-0.03em] text-white mb-4"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.0,
            }}
          >
            {actividad.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>{destino.name}</span>
            {actividad.provider && (
              <>
                <span>·</span>
                <span>{actividad.provider.name}</span>
              </>
            )}
            <span>·</span>
            <span
              className="font-semibold"
              style={{ color: '#00D9C0' }}
            >
              {formatPrice(
                actividad.priceFrom ? Number(actividad.priceFrom) : null,
                actividad.priceTo ? Number(actividad.priceTo) : null,
                actividad.isFree
              )}
            </span>
          </div>

          {/* Categorías */}
          {actividad.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {actividad.categories.map(({ category }: { category: { id: string; name: string } }) => (
                <span
                  key={category.id}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div
          className="py-10 space-y-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {actividad.shortDescription}
          </p>
          {actividad.longDescription && (
            <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {actividad.longDescription}
            </p>
          )}
        </div>

        {/* Info + Prestador */}
        <div
          className="py-10 grid md:grid-cols-2 gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Info */}
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h3 className="text-sm font-semibold text-white">Información</h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt style={{ color: 'rgba(255,255,255,0.35)' }}>Tipo</dt>
                <dd className="text-white mt-0.5">
                  {actividad.isRecurring ? 'Actividad recurrente' : 'Evento con fecha'}
                </dd>
              </div>
              {actividad.startDate && (
                <div>
                  <dt style={{ color: 'rgba(255,255,255,0.35)' }}>Fecha de inicio</dt>
                  <dd className="text-white mt-0.5">
                    {new Date(actividad.startDate).toLocaleDateString('es-AR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
              )}
              {scheduleData?.texto && (
                <div>
                  <dt style={{ color: 'rgba(255,255,255,0.35)' }}>Horarios</dt>
                  <dd className="text-white mt-0.5">{scheduleData.texto}</dd>
                </div>
              )}
              {actividad.maxCapacity && (
                <div>
                  <dt style={{ color: 'rgba(255,255,255,0.35)' }}>Capacidad</dt>
                  <dd className="text-white mt-0.5">{actividad.maxCapacity} personas</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Prestador */}
          {actividad.provider && (
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3 className="text-sm font-semibold text-white">Prestador</h3>
              <div className="space-y-2">
                <p className="font-semibold text-white">{actividad.provider.name}</p>
                {actividad.provider.bio && (
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {actividad.provider.bio}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CTA WhatsApp */}
        {!isClosed && actividad.provider?.whatsapp && (
          <div
            className="py-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="text-lg font-bold text-white mb-2">
              ¿Te interesa?
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Consultá disponibilidad directamente con el prestador.
            </p>
            <WhatsAppButton
              whatsapp={actividad.provider.whatsapp}
              message={actividad.whatsappMessage || `Hola! Vi "${actividad.title}" en Andén y me gustaría saber más.`}
            />
          </div>
        )}

        {/* Volver */}
        <div
          className="pt-8 mt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Link
            href={`/${destino.slug}`}
            className="text-sm transition-opacity hover:opacity-100"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            ← Volver a {destino.name}
          </Link>
        </div>
      </div>
    </div>
  );
}