import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ActivityStatusSelector } from '@/components/activity-status-selector';
import { EditButton } from './edit-button';
import { ActivityStatus, ActivityType } from '@prisma/client';

// ─── Types ───────────────────────────────────────────────────────────────────

type Activity = {
  id: string;
  title: string;
  status: ActivityStatus;
  activityType: ActivityType;
  statusNote: string | null;
  isPublished: boolean;
  viewCount: number;
  whatsappClickCount: number;
  createdAt: Date;
  media: { url: string; order: number }[];
};

// ─── Gradientes de fallback por tipo ─────────────────────────────────────────

const TYPE_GRADIENT: Record<ActivityType, string> = {
  EXCURSION:         'linear-gradient(135deg,#0D3B5A,#0E9AA7)',
  CULTURAL_EVENT:    'linear-gradient(135deg,#2D1B4E,#C4534A)',
  EXHIBITION:        'linear-gradient(135deg,#1A2D4E,#4E6B8A)',
  ATTRACTION:        'linear-gradient(135deg,#0D2A1A,#2D8A50)',
  WORKSHOP:          'linear-gradient(135deg,#3A2D1A,#8A6B4E)',
  FESTIVAL:          'linear-gradient(135deg,#4A2700,#E8A845)',
  GASTRONOMIC_EVENT: 'linear-gradient(135deg,#3A1A00,#C47A4E)',
  NIGHTLIFE_EVENT:   'linear-gradient(135deg,#1A0D2A,#8A4E8A)',
};

// ─── Banner de verificación pendiente ────────────────────────────────────────

function ProviderStatusBanner({ status }: { status: string }) {
  if (status !== 'PENDING') return null;
  return (
    <div
      className="flex items-start gap-3 rounded-lg px-5 py-4 mb-8"
      style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.15)',
      }}
    >
      <span className="text-amber-400 mt-0.5 shrink-0">⏳</span>
      <div>
        <p className="text-sm font-medium" style={{ color: '#EDEBE8' }}>
          Verificación en proceso
        </p>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(237,235,232,0.5)' }}>
          Revisamos tu perfil en 48-72hs. Mientras tanto podés crear actividades y explorar la plataforma.
        </p>
      </div>
    </div>
  );
}

// ─── Thumbnail de actividad ───────────────────────────────────────────────────

function ActivityThumb({ activity }: { activity: Activity }) {
  const cover = activity.media.sort((a, b) => a.order - b.order)[0];
  const gradient = TYPE_GRADIENT[activity.activityType];

  return (
    <div
      className="size-[52px] rounded-lg shrink-0 overflow-hidden"
      style={{ background: gradient }}
    >
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.url}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const provider = await prisma.provider.findFirst({
    where: { ownerId: session.user.id },
    include: {
      destination: true,
      activities: {
        orderBy: { createdAt: 'desc' },
        include: {
          media: { orderBy: { order: 'asc' } },
        },
      },
    },
  });

  const activities: Activity[] = (provider?.activities ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    status: a.status,
    activityType: a.activityType,
    statusNote: a.statusNote,
    isPublished: a.isPublished,
    viewCount: a.viewCount,
    whatsappClickCount: a.whatsappClickCount,
    createdAt: a.createdAt,
    media: a.media.map((m) => ({ url: m.url, order: m.order })),
  }));

  const totalVistas = activities.reduce((acc, a) => acc + a.viewCount, 0);
  const totalConsultas = activities.reduce((acc, a) => acc + a.whatsappClickCount, 0);
  const inicial = provider?.name?.charAt(0).toUpperCase() ?? '?';

  return (
    <main
      className="min-h-screen"
      style={{ background: '#111110' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">

        {/* ── Sin perfil ── */}
        {!provider && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: 'rgba(237,235,232,0.28)' }}
            >
              Panel comercial
            </p>
            <h1
              className="text-4xl md:text-5xl font-black tracking-[-0.03em] mb-4"
              style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
            >
              Bienvenido a Andén
            </h1>
            <p
              className="text-base mb-10 max-w-sm leading-relaxed"
              style={{ color: 'rgba(237,235,232,0.35)' }}
            >
              Para publicar actividades, primero creá el perfil de tu negocio o emprendimiento.
            </p>
            <Link href="/dashboard/crear-perfil">
              <button
                className="cursor-pointer px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
              >
                Crear mi perfil
              </button>
            </Link>
          </div>
        )}

        {/* ── Con perfil ── */}
        {provider && (
          <>
            <ProviderStatusBanner status={provider.status} />

            {/* Header */}
            <div
              className="flex items-center justify-between gap-4 pb-8"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="size-14 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-3xl font-bold"
                  style={{
                    background: provider.logoUrl
                      ? 'transparent'
                      : 'linear-gradient(135deg,#C4956A,#8A5A3A)',
                    color: '#fff',
                    fontFamily: 'var(--font-playfair)',
                  }}
                >
                  {provider.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={provider.logoUrl}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    inicial
                  )}
                </div>

                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(237,235,232,0.28)' }}
                  >
                    Dashboard
                  </p>
                  <h1
                    className="text-2xl md:text-4xl font-black tracking-[-0.03em] leading-none"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
                  >
                    {provider.name}
                  </h1>
                  <p className="text-sm mt-1" style={{ color: 'rgba(237,235,232,0.35)' }}>
                    {provider.destination.name} · {provider.destination.province}
                  </p>
                </div>
              </div>

              <Link href="/dashboard/nueva-actividad" className="hidden md:block">
                <button
                  className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80"
                  style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
                >
                  + Nueva actividad
                </button>
              </Link>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-4 mb-10" >
              {[
                { valor: activities.length,                               label: 'Actividades',        accent: false },
                { valor: activities.filter((a) => a.isPublished).length,  label: 'Publicadas',         accent: false },
                { valor: totalVistas,                                      label: 'Vistas totales',     accent: true  },
                { valor: totalConsultas,                                   label: 'Consultas WhatsApp', accent: true  },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1.5 py-7 relative"
                  style={{
                    borderRight: i < 3 ? '0.5px solid transparent' : 'none',
                  }}
                >
                  {/* Divisor con fade vertical */}
                  {i < 3 && (
                    <div
                      className="absolute right-0 top-0 h-full w-px"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)',
                      }}
                    />
                  )}
                    {/* Línea superior con fade */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)',
                      }}
                    />
                    {/* Línea inferior con fade */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)',
                      }}
                    />
                  <span
                    className="text-4xl font-black tracking-tight leading-none"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      color: stat.accent ? 'var(--color-sand)' : '#EDEBE8',
                    }}
                  >
                    {stat.valor}
                  </span>
                  <span
                    className="text-xs font-mono uppercase tracking-widest text-center"
                    style={{ color: 'rgba(237,235,232,0.28)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Lista de actividades */}
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: 'rgba(237,235,232,0.28)' }}
              >
                Mis actividades
              </p>

              {activities.length === 0 ? (
                <div
                  className="rounded-lg p-12 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-base mb-6" style={{ color: 'rgba(237,235,232,0.4)' }}>
                    Todavía no publicaste ninguna actividad.
                  </p>
                  <Link href="/dashboard/nueva-actividad">
                    <button
                      className="cursor-pointer px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
                    >
                      Publicar mi primera actividad
                    </button>
                  </Link>
                </div>
              ) : (
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {activities.map((activity, index) => {
                    const isClosed = activity.status === 'CLOSED' || activity.status === 'SOLD_OUT';
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 px-5 py-4 transition-colors duration-150"
                        style={{
                          borderTop: index > 0 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
                          opacity: isClosed ? 0.5 : 1,
                        }}
                      >
                        {/* Thumbnail */}
                        <ActivityThumb activity={activity} />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-bold text-base truncate mb-2 leading-tight"
                            style={{
                              fontFamily: 'var(--font-playfair)',
                              color: '#EDEBE8',
                            }}
                          >
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <ActivityStatusSelector
                              activityId={activity.id}
                              currentStatus={activity.status}
                              currentNote={activity.statusNote}
                              activityTitle={activity.title}
                            />
                            {!activity.isPublished && (
                              <span
                                className="text-xs px-2.5 py-1 rounded-lg"
                                style={{
                                  color: 'rgba(237,235,232,0.4)',
                                  border: '0.5px solid rgba(255,255,255,0.08)',
                                }}
                              >
                                Borrador
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats + Editar */}
                        <div className="flex items-center gap-5 shrink-0">
                          <p
                            className="text-sm hidden md:block"
                            style={{ color: 'rgba(237,235,232,0.25)' }}
                          >
                            {activity.viewCount} vistas · {activity.whatsappClickCount} consultas
                          </p>
                          <EditButton href={`/dashboard/editar-actividad/${activity.id}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA mobile */}
            <div className="md:hidden mt-8">
              <Link href="/dashboard/nueva-actividad">
                <button
                  className="cursor-pointer w-full py-4 rounded-lg text-sm font-semibold"
                  style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
                >
                  + Nueva actividad
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
