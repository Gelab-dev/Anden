// Tests del guard de autorización (anti-IDOR).
// Unitarios: inyectan un `db` falso que respeta el filtro de ownership,
// para probar que findOwnedActivity SIEMPRE scopea la query por el dueño
// actual — sin tocar la base. Correr con: pnpm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findOwnedActivity, isProvider, type AuthzDB } from './authz'

// Actividad de referencia: pertenece a user_A.
const ACT = { id: 'act_1', ownerId: 'user_A' }

// `db` falso que emula a Prisma: solo devuelve la actividad si el where
// pide el id correcto Y el ownerId correcto (igual que el filtro real).
const fakeDB: AuthzDB = {
  activity: {
    findFirst: async ({ where }) =>
      where.id === ACT.id && where.provider.ownerId === ACT.ownerId
        ? { id: ACT.id, title: 'demo' }
        : null,
  },
  user: {
    findUnique: async () => null,
  },
}

test('el dueño accede a su propia actividad', async () => {
  const result = await findOwnedActivity('act_1', 'user_A', undefined, fakeDB)
  assert.ok(result, 'el dueño debería recibir la actividad')
  assert.equal(result?.id, 'act_1')
})

test('un usuario NO puede acceder a la actividad de otro (devuelve null → 404)', async () => {
  const result = await findOwnedActivity('act_1', 'user_B', undefined, fakeDB)
  assert.equal(result, null, 'un no-dueño debe recibir null, nunca la actividad ajena')
})

test('la query SIEMPRE queda scopeada por el ownerId del usuario actual', async () => {
  let captured: { id: string; provider: { ownerId: string } } | undefined
  const spyDB: AuthzDB = {
    activity: {
      findFirst: async ({ where }) => {
        captured = where
        return null
      },
    },
    user: { findUnique: async () => null },
  }
  await findOwnedActivity('act_1', 'user_B', undefined, spyDB)
  assert.equal(captured?.id, 'act_1')
  assert.equal(captured?.provider.ownerId, 'user_B')
})

test('args (include) se pasan a la query sin pisar el filtro de ownership', async () => {
  let captured: { include?: unknown; where: { provider: { ownerId: string } } } | undefined
  const spyDB: AuthzDB = {
    activity: {
      findFirst: async (args) => {
        captured = args
        return null
      },
    },
    user: { findUnique: async () => null },
  }
  await findOwnedActivity('act_1', 'user_A', { include: { media: true } }, spyDB)
  assert.deepEqual(captured?.include, { media: true })
  assert.equal(captured?.where.provider.ownerId, 'user_A', 'el ownership no se pisa con args')
})

test('isProvider: TRUE para PROVIDER_OWNER y ADMIN, FALSE para TRAVELER', async () => {
  const dbWith = (role: string | null): AuthzDB => ({
    activity: { findFirst: async () => null },
    user: { findUnique: async () => (role ? { role } : null) },
  })
  assert.equal(await isProvider('u', dbWith('PROVIDER_OWNER')), true)
  assert.equal(await isProvider('u', dbWith('ADMIN')), true)
  assert.equal(await isProvider('u', dbWith('TRAVELER')), false)
  assert.equal(await isProvider('u', dbWith(null)), false)
})
