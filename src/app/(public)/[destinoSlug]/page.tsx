import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ActivityCard } from './activity-card';

interface PageProps {
  params: Promise<{ destinoSlug: string }>;
}

type ActivityWithRelations = Awaited<ReturnType<typeof prisma.activity.findMany>>[number] & {
  categories: { category: { id: string; name: string } }[];
  provider: { name: string; whatsapp: string | null } | null;
  media: { url: string; altText: string | null; order: number }[];
};

export async function generateMetadata({ params }: PageProps) {
  const { destinoSlug } = await params;
  const destino = await prisma.destination.findUnique({
    where: { slug: destinoSlug, isActive: true },
  });

  if (!destino) return {};

  return {
    title: `Qué hacer en ${destino.name} hoy — Andén`,
    description: `Actividades, eventos y experiencias en ${destino.name} actualizadas en tiempo real.`,
  };
}

export default async function DestinoPage({ params }: PageProps) {
  const { destinoSlug } = await params;

  const destino = await prisma.destination.findUnique({
    where: { slug: destinoSlug, isActive: true },
    include: {
      activities: {
        where: {
          isPublished: true,
          provider: { status: 'VERIFIED' },
        },
        include: {
          categories: { include: { category: true } },
          provider: true,
          media: { orderBy: { order: 'asc' } },
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' },
        ],
      },
    },
  });

  if (!destino) notFound();

  const activitiesData = (destino.activities as ActivityWithRelations[]).map((activity) => ({
    id: activity.id,
    slug: activity.slug,
    title: activity.title,
    shortDescription: activity.shortDescription,
    status: activity.status,
    statusNote: activity.statusNote,
    activityType: activity.activityType,
    isRecurring: activity.isRecurring,
    startDate: activity.startDate ?? null,
    endDate: activity.endDate ?? null,
    priceFrom: activity.priceFrom ? Number(activity.priceFrom) : null,
    priceTo: activity.priceTo ? Number(activity.priceTo) : null,
    isFree: activity.isFree,
    whatsappMessage: activity.whatsappMessage,
    provider: activity.provider
      ? {
          name: activity.provider.name,
          whatsapp: activity.provider.whatsapp,
        }
      : null,
    media: activity.media.map((m) => ({
      url: m.url,
      altText: m.altText,
      order: m.order,
    })),
    categories: activity.categories.map(({ category }: { category: { id: string; name: string } }) => ({
      category: { id: category.id, name: category.name },
    })),
  }));

  const operando = activitiesData.filter((a) => a.status === 'OPERATING');
  const resto = activitiesData.filter((a) => a.status !== 'OPERATING');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-board)' }}>

      {/* Header del destino */}
      <section
        className="relative px-6 md:px-12 pt-16 pb-12 overflow-hidden"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(255,159,28,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cream/30 mb-4">
            Andén · {destino.province}
          </p>
          <h1
            className="font-black tracking-[-0.03em] text-white mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.0,
            }}
          >
            {destino.name}
          </h1>
          {destino.shortDescription && (
            <p className="text-cream/45 max-w-xl leading-relaxed mb-6">
              {destino.shortDescription}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-signal)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-signal)]" />
              </div>
              <span className="text-sm text-cream/45">
                <span className="text-cream font-semibold">{operando.length}</span> operando ahora
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-cream/30">
                {activitiesData.length} actividades en total
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {activitiesData.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-cream/35 mb-2">
              No hay actividades publicadas en {destino.name} todavía.
            </p>
            <p className="text-sm text-cream/25">
              Volvé pronto — estamos incorporando prestadores.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Operando ahora */}
            {operando.length > 0 && (
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-signal)] mb-6">
                  Operando ahora
                </p>
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
                >
                  {operando.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      destinoSlug={destinoSlug}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Resto */}
            {resto.length > 0 && (
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-cream/25 mb-6">
                  Otras actividades
                </p>
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
                >
                  {resto.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      destinoSlug={destinoSlug}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
