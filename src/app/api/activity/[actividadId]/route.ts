import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ actividadId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { actividadId } = await params;

    const activity = await prisma.activity.findFirst({
      where: {
        id: actividadId,
        provider: { ownerId: session.user.id },
      },
      include: {
        media: { orderBy: { order: 'asc' } },
      },
    });

    if (!activity) {
      return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    }

    return NextResponse.json({ activity });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}