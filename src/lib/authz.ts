// Autorización compartida (ownership y roles).
// Toda route handler / server action que toque un recurso con dueño debe
// pasar por acá — el proxy.ts es solo borde de red, no autoriza nada.
import { prisma } from './prisma'
import type { Prisma } from '@prisma/client'

// Filtro que garantiza el scope por dueño. Es el corazón anti-IDOR:
// nunca se consulta una actividad sin acotarla al ownerId del usuario.
type OwnedActivityWhere = { id: string; provider: { ownerId: string } }

// Shape mínima de Prisma que usan estos helpers. Definida a mano (en vez de
// reusar los tipos generados, que son genéricos pesados) para poder inyectar
// un cliente falso en los tests sin levantar la base.
export type AuthzDB = {
  activity: {
    findFirst: (
      args: { where: OwnedActivityWhere } & Record<string, unknown>,
    ) => PromiseLike<unknown>
  }
  user: {
    findUnique: (args: {
      where: { id: string }
      select: { role: true }
    }) => PromiseLike<{ role: string } | null>
  }
}

// El cliente real cumple esta forma en runtime; el cast reconcilia las firmas
// genéricas de Prisma con la interfaz mínima. Único cast del módulo.
const defaultDB = prisma as unknown as AuthzDB

/**
 * Devuelve la actividad SOLO si pertenece al provider del usuario.
 * Si no existe o es de otro dueño → null (el handler responde 404, como hoy).
 * `args` permite pasar include/select sin pisar nunca el filtro de ownership.
 */
export async function findOwnedActivity<
  T extends Omit<Prisma.ActivityFindFirstArgs, 'where'>,
>(
  activityId: string,
  ownerId: string,
  args?: T,
  db: AuthzDB = defaultDB,
): Promise<Prisma.ActivityGetPayload<T> | null> {
  const result = await db.activity.findFirst({
    ...args,
    where: { id: activityId, provider: { ownerId } },
  })
  return result as Prisma.ActivityGetPayload<T> | null
}

/**
 * True si el usuario puede actuar como prestador (dueño de perfil o admin).
 * El rol no viaja en la sesión JWT, así que se consulta puntualmente.
 */
export async function isProvider(
  userId: string,
  db: AuthzDB = defaultDB,
): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })
  return user?.role === 'PROVIDER_OWNER' || user?.role === 'ADMIN'
}
