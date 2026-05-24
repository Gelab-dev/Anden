import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DestinoPill } from './destino-pill';

type ActividadDestacada = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  status: string;
  priceFrom: unknown;
  priceTo: unknown;
  isFree: boolean;
  destination: { slug: string; name: string };
};

function formatPrice(from: number | null, to: number | null, isFree: boolean) {
  if (isFree) return 'Gratis';
  if (!from) return 'Consultar';
  const toNum = to ? Number(to) : null;
  if (!toNum || Number(from) === toNum) return `$${Number(from).toLocaleString()}`;
  return `Desde $${Number(from).toLocaleString()}`;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  OPERATING: { label: 'Operando',         color: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)'  },
  LIMITED:   { label: 'Cupo limitado',    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)'  },
  CLOSED:    { label: 'Cerrado',          color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'   },
  SOLD_OUT:  { label: 'Sin cupos',        color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.2)'  },
};

export default async function Home() {
  const destinos = await prisma.destination.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { activities: { where: { isPublished: true } } },
      },
    },
    orderBy: { isFeatured: 'desc' },
  });

  const actividadesDestacadas = await prisma.activity.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
      provider: { status: 'VERIFIED' },
    },
    include: {
      destination: true,
      provider: true,
      categories: { include: { category: true }, take: 1 },
    },
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-dark-900">

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,217,192,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-turquoise mb-6">
            La cartelera viva de cada destino
          </p>
          <h1
            className="font-black tracking-[-0.03em] text-white mb-6"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1.0,
            }}
          >
            Descubrí qué hacer
            <br />
            <span style={{ color: '#00D9C0' }}>hoy en tu destino.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            Actividades, eventos y experiencias actualizadas en tiempo real
            por quienes las organizan.
          </p>

          {/* Destinos */}
          <div className="flex flex-wrap gap-3 justify-center">
            {destinos.map((destino: { id: string; slug: string; name: string; _count: { activities: number } }) => (
              <DestinoPill
                key={destino.id}
                slug={destino.slug}
                name={destino.name}
                count={destino._count.activities}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Actividades destacadas */}
      {actividadesDestacadas.length > 0 && (
        <section className="px-6 md:px-12 py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-gray-500 mb-3">
                  Destacadas
                </p>
                <h2
                  className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Lo mejor de cada destino
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actividadesDestacadas.map((activity: ActividadDestacada) => {
                const statusConfig = STATUS_CONFIG[activity.status];
                return (
                  <Link
                    key={activity.id}
                    href={`/${activity.destination.slug}`}
                    className="group block rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {statusConfig && (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4"
                        style={{
                          color: statusConfig.color,
                          background: statusConfig.bg,
                          border: `1px solid ${statusConfig.border}`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig.color }} />
                        {statusConfig.label}
                      </span>
                    )}

                    <h3 className="font-bold text-white mb-2 group-hover:text-turquoise transition-colors duration-200">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {activity.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{activity.destination.name}</span>
                      <span className="text-sm font-semibold text-turquoise">
                        {formatPrice(
                          activity.priceFrom ? Number(activity.priceFrom) : null,
                          activity.priceTo ? Number(activity.priceTo) : null,
                          activity.isFree
                        )}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA prestador */}
      <section
        className="px-6 md:px-12 py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-gray-500 mb-4">
            Para negocios
          </p>
          <h2
            className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            ¿Organizás actividades?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Publicá en Andén y aparecé cuando alguien busca qué hacer hoy en tu ciudad.
          </p>
          <Link href="/comercial">
            <button
              className="cursor-pointer px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#00D9C0', color: '#0D1B2A' }}
            >
              Conocé Andén para negocios
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}