import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { activityId, status, statusNote } = await request.json();

    if (!activityId || !status) {
      return NextResponse.json(
        { error: 'activityId y status son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que la actividad pertenece al provider del usuario
    const activity = await prisma.activity.findFirst({
      where: {
        id: activityId,
        provider: { ownerId: session.user.id },
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Actividad no encontrada o sin permisos' },
        { status: 404 }
      );
    }

    const updated = await prisma.activity.update({
      where: { id: activityId },
      data: {
        status,
        statusNote: statusNote || null,
      },
    });

    return NextResponse.json({ activity: updated });
  } catch (error) {
    console.error('Error actualizando estado:', error);
    return NextResponse.json(
      { error: 'Error al actualizar estado' },
      { status: 500 }
    );
  }
}