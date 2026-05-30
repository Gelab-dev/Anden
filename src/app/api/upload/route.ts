// src/app/api/upload/route.ts
// Recibe un archivo de imagen, lo sube a Vercel Blob y devuelve la URL pública.

import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isProvider } from '@/lib/authz'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(req: Request) {
  // Autenticación — solo prestadores logueados pueden subir
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  // Autorización — el blob es público; restringir a prestadores (o admin)
  if (!(await isProvider(session.user.id))) {
    return NextResponse.json(
      { error: 'Necesitás un perfil de prestador para subir imágenes' },
      { status: 403 },
    )
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Request inválido' }, { status: 400 })
  }

  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 })
  }

  // Validar tipo
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Tipo de archivo no permitido. Usá JPG, PNG, WebP o GIF.' },
      { status: 400 }
    )
  }

  // Validar tamaño
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: 'La imagen no puede superar 5MB.' },
      { status: 400 }
    )
  }

  // Nombre limpio con timestamp para evitar colisiones
  const ext = file.name.split('.').pop() ?? 'jpg'
  const safeName = `anden/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  try {
    const blob = await put(safeName, file, {
      access: 'public',
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url })
  } catch (err) {
    console.error('[upload] Error subiendo a Vercel Blob:', err)
    return NextResponse.json(
      { error: 'Error al subir la imagen. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
