import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const {
      activityId,
      title,
      shortDescription,
      longDescription,
      priceFrom,
      priceTo,
      isFree,
      maxCapacity,
      whatsappMessage,
      statusNote,
      eventDate,
      eventEndDate,
      schedule,
    } = await request.json();

    if (!activityId || !title || !shortDescription) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Verificar que pertenece al usuario
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
        title,
        shortDescription,
        longDescription: longDescription || null,
        isFree: isFree || false,
        priceFrom: !isFree && priceFrom ? parseFloat(priceFrom) : null,
        priceTo: !isFree && priceTo ? parseFloat(priceTo) : null,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
        whatsappMessage: whatsappMessage || null,
        statusNote: statusNote || null,
        startDate: eventDate ? new Date(eventDate) : null,
        endDate: eventEndDate ? new Date(eventEndDate) : null,
        schedule: schedule ? { texto: schedule } : undefined,
      },
    });

    return NextResponse.json({ activity: updated });
  } catch (error) {
    console.error('Error actualizando actividad:', error);
    return NextResponse.json(
      { error: 'Error al actualizar actividad' },
      { status: 500 }
    );
  }
}