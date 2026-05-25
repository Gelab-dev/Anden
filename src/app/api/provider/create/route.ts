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

    const { whatsapp, bio, destinationSlug, logoUrl, coverUrl } = await request.json();

    // Validación
    if (!whatsapp || !destinationSlug) {
      return NextResponse.json(
        { error: 'WhatsApp y destino son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que no tenga ya un provider
    const existing = await prisma.provider.findFirst({
      where: { ownerId: session.user.id },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Ya tenés un perfil creado' },
        { status: 400 }
      );
    }

    // Buscar destino
    const destination = await prisma.destination.findUnique({
      where: { slug: destinationSlug },
    });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destino no encontrado' },
        { status: 404 }
      );
    }

    // Usar nombre del usuario como nombre del negocio
    const businessName = session.user.name || 'Mi Negocio';
    
    // Crear slug del provider
    const slug = businessName.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Crear provider y actualizar rol del usuario en una transacción
    const [provider] = await prisma.$transaction([
      prisma.provider.create({
        data: {
          slug,
          name: businessName,
          email: session.user.email || '',
          whatsapp,
          bio: bio || null,
          destinationId: destination.id,
          ownerId: session.user.id,
          logoUrl: logoUrl ?? undefined,
          coverUrl: coverUrl ?? undefined,
          status: 'PENDING',
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { role: 'PROVIDER_OWNER' },
      }),
    ]);

    return NextResponse.json({ provider }, { status: 201 });
  } catch (error) {
    console.error('Error creando provider:', error);
    return NextResponse.json(
      { error: 'Error al crear perfil' },
      { status: 500 }
    );
  }
}