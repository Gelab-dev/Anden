import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const {
      title,
      shortDescription,
      longDescription,
      priceFrom,
      priceTo,
      isFree,
      maxCapacity,
      whatsappMessage,
      status,
      statusNote,
      tipo,
      eventDate,
      eventEndDate,
      schedule,
    } = await request.json();

    if (!title || !shortDescription) {
      return NextResponse.json(
        { error: 'Título y descripción corta son requeridos' },
        { status: 400 }
      );
    }

    if (tipo === 'eventual' && !eventDate) {
      return NextResponse.json(
        { error: 'La fecha de inicio es requerida para actividades eventuales' },
        { status: 400 }
      );
    }

    if (tipo === 'recurrente' && !schedule) {
      return NextResponse.json(
        { error: 'El esquema de horarios es requerido para actividades recurrentes' },
        { status: 400 }
      );
    }

    const provider = await prisma.provider.findFirst({
      where: { ownerId: session.user.id },
      include: { destination: true },
    });

    if (!provider) {
      return NextResponse.json(
        { error: 'Necesitás crear tu perfil comercial primero' },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const activity = await prisma.activity.create({
      data: {
        slug,
        title,
        shortDescription,
        longDescription: longDescription || null,
        destinationId: provider.destinationId,
        providerId: provider.id,
        status: status || 'OPERATING',
        statusNote: statusNote || null,
        isFree: isFree || false,
        priceFrom: !isFree && priceFrom ? parseFloat(priceFrom) : null,
        priceTo: !isFree && priceTo ? parseFloat(priceTo) : null,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
        whatsappMessage: whatsappMessage || null,
        isPublished: true,
        activityType: 'EXCURSION',
        isRecurring: tipo === 'recurrente',
        startDate: tipo === 'eventual' && eventDate ? new Date(eventDate) : null,
        endDate: tipo === 'eventual' && eventEndDate ? new Date(eventEndDate) : null,
        schedule: tipo === 'recurrente' && schedule ? { texto: schedule } : undefined,
      },
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error('Error creando actividad:', error);
    return NextResponse.json(
      { error: 'Error al crear actividad' },
      { status: 500 }
    );
  }
}