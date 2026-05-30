// src/app/api/activity/update-status/route.ts

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { findOwnedActivity } from '@/lib/authz'
import { ActivityStatus } from '@prisma/client'

const VALID_STATUSES: ActivityStatus[] = [
  'OPERATING',
  'LIMITED',
  'SOLD_OUT',
  'CLOSED',
  'SCHEDULED',
]

export async function PATCH(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { activityId, status, statusNote } = await request.json()

    if (!activityId || !status) {
      return NextResponse.json(
        { error: 'activityId y status son requeridos' },
        { status: 400 }
      )
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
    }

    // Verificar que la actividad pertenece al prestador autenticado
    const activity = await findOwnedActivity(activityId, session.user.id)

    if (!activity) {
      return NextResponse.json(
        { error: 'Actividad no encontrada o sin permisos' },
        { status: 404 }
      )
    }

    const updated = await prisma.activity.update({
      where: { id: activityId },
      data: {
        status,
        statusNote: statusNote || null,
        statusUpdatedAt: new Date(),
      },
    })

    return NextResponse.json({ activity: updated })
  } catch (error) {
    console.error('[update-status]', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
