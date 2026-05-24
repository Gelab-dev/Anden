import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ActivityStatusSelector } from '@/components/activity-status-selector';



function ProviderStatusBanner({ status }: { status: string }) {
  if (status !== 'PENDING') return null;
  return (
    <div
      className="flex items-start gap-3 rounded-xl px-5 py-4 mb-8"
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

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const provider = await prisma.provider.findFirst({
    where: { ownerId: session.user.id },
    include: {
      activities: { orderBy: { createdAt: 'desc' } },
      destination: true,
    },
  });

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">

      {/* Sin perfil */}
      {!provider && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1
            className="text-4xl md:text-5xl font-black tracking-[-0.03em] mb-4"
            style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
          >
            Bienvenido a Andén
          </h1>
          <p className="text-base mb-10 max-w-md" style={{ color: 'rgba(237,235,232,0.5)' }}>
            Para publicar actividades, primero creá el perfil de tu negocio o emprendimiento.
          </p>
          <Link href="/dashboard/crear-perfil">
            <button
              className="cursor-pointer px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
            >
              Crear mi perfil
            </button>
          </Link>
        </div>
      )}

      {/* Con perfil */}
      {provider && (
        <>
          {/* Banner verificación */}
          <ProviderStatusBanner status={provider.status} />

          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <p
                className="text-xs font-mono tracking-[0.2em] uppercase mb-2"
                style={{ color: 'var(--color-sand)' }}
              >
                Panel comercial
              </p>
              <h1
                className="text-4xl md:text-5xl font-black tracking-[-0.03em]"
                style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
              >
                {provider.name}
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'rgba(237,235,232,0.4)' }}>
                {provider.destination.name}
              </p>
            </div>

            <Link href="/dashboard/nueva-actividad">
              <button
                className="cursor-pointer hidden md:flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
              >
                + Nueva actividad
              </button>
            </Link>
          </div>

          {/* Stats rápidas */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12"
            style={{ background: 'var(--color-surface-border)' }}
          >
            {[
              {
                valor: provider.activities.length,
                label: 'Actividades',
              },
              {
                valor: provider.activities.filter(a => a.isPublished).length,
                label: 'Publicadas',
              },
              {
                valor: provider.activities.reduce((acc, a) => acc + (a.viewCount ?? 0), 0),
                label: 'Vistas totales',
              },
              {
                valor: provider.activities.reduce((acc, a) => acc + (a.whatsappClickCount ?? 0), 0),
                label: 'Consultas WhatsApp',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 p-6"
                style={{ background: 'var(--color-surface-2)' }}
              >
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
                >
                  {stat.valor}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: 'rgba(237,235,232,0.35)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Lista de actividades */}
          <div>
            <h2
              className="text-lg font-bold mb-6"
              style={{ color: '#EDEBE8' }}
            >
              Mis actividades
            </h2>

            {provider.activities.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-surface-border)',
                }}
              >
                <p className="text-base mb-6" style={{ color: 'rgba(237,235,232,0.4)' }}>
                  Todavía no publicaste ninguna actividad.
                </p>
                <Link href="/dashboard/nueva-actividad">
                  <button
                    className="cursor-pointer px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
                    style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
                  >
                    Publicar mi primera actividad
                  </button>
                </Link>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--color-surface-border)' }}
              >
                {provider.activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-6 px-6 py-5 transition-colors duration-200 hover:bg-white/2"
                    style={{
                      background: 'var(--color-surface-2)',
                      borderTop: index > 0 ? '1px solid var(--color-surface-border)' : 'none',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate mb-2" style={{ color: '#EDEBE8' }}>
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <ActivityStatusSelector
                          activityId={activity.id}
                          currentStatus={activity.status}
                          currentNote={activity.statusNote}
                          activityTitle={activity.title}
                        />
                        {!activity.isPublished && (
                          <span
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              color: 'rgba(237,235,232,0.4)',
                              border: '1px solid var(--color-surface-border)',
                            }}
                          >
                            Borrador
                          </span>
                        )}
                        <Link href={`/dashboard/editar-actividad/${activity.id}`}>
                          <button
                            className="cursor-pointer shrink-0 text-xs px-4 py-2 rounded-full transition-all duration-200 hover:opacity-70"
                            style={{
                              color: 'rgba(237,235,232,0.5)',
                              border: '1px solid var(--color-surface-border)',
                            }}
                          >
                            Editar
                          </button>
                        </Link>
                      </div>
                      <p className="text-xs mt-2" style={{ color: 'rgba(237,235,232,0.35)' }}>
                        {activity.viewCount ?? 0} vistas · {activity.whatsappClickCount ?? 0} consultas
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA mobile nueva actividad */}
          <div className="md:hidden mt-8">
            <Link href="/dashboard/nueva-actividad">
              <button
                className="cursor-pointer w-full py-4 rounded-full text-sm font-semibold"
                style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
              >
                + Nueva actividad
              </button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}