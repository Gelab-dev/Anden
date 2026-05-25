'use client';

// src/app/(dashboard)/dashboard/crear-perfil/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { ImageUploader } from '@/components/image-uploader';

const DESTINOS = [
  { slug: 'puerto-madryn', label: 'Puerto Madryn' },
  { slug: 'la-plata', label: 'La Plata' },
];

export default function CrearPerfilPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    whatsapp: '',
    bio: '',
    destinationSlug: 'puerto-madryn',
    logoUrls: [] as string[],     // máx 1 — logo del negocio
    coverUrls: [] as string[],    // máx 1 — imagen de portada
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/provider/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp: formData.whatsapp,
          bio: formData.bio,
          destinationSlug: formData.destinationSlug,
          logoUrl: formData.logoUrls[0] ?? null,
          coverUrl: formData.coverUrls[0] ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al crear perfil');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Error al crear perfil');
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
      >
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--color-sand)' }}
          >
            Paso 1 de 1
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-[-0.03em] mb-4"
            style={{ fontFamily: 'var(--font-playfair)', color: '#EDEBE8' }}
          >
            Completá tu perfil
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(237,235,232,0.5)' }}>
            Esta información aparece en tu perfil público dentro de Andén. Podés editarla después.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Nombre del negocio — solo lectura */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold"
              style={{ color: 'rgba(237,235,232,0.7)' }}
            >
              Nombre del negocio
            </label>
            <div
              className="h-12 px-4 rounded-xl flex items-center text-base"
              style={{
                background: 'var(--color-surface-3)',
                border: '1px solid var(--color-surface-border)',
                color: 'rgba(237,235,232,0.4)',
              }}
            >
              {session?.user?.name || '—'}
            </div>
            <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
              Este es el nombre con el que te registraste.
            </p>
          </div>

          {/* Logo */}
          <ImageUploader
            label="Logo del negocio"
            hint="Aparece en tu perfil público. Recomendamos imagen cuadrada."
            multiple={false}
            value={formData.logoUrls}
            onChange={(urls) => setFormData({ ...formData, logoUrls: urls })}
          />

          {/* Imagen de portada */}
          <ImageUploader
            label="Imagen de portada"
            hint="Imagen panorámica que encabeza tu perfil. Recomendamos 1200×400px."
            multiple={false}
            value={formData.coverUrls}
            onChange={(urls) => setFormData({ ...formData, coverUrls: urls })}
          />

          {/* WhatsApp */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="whatsapp"
              className="text-sm font-semibold"
              style={{ color: 'rgba(237,235,232,0.7)' }}
            >
              WhatsApp <span style={{ color: 'var(--color-sand)' }}>*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+54 280 445-5000"
              required
              className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
              style={{
                background: 'var(--color-surface-3)',
                border: '1px solid var(--color-surface-border)',
                color: '#EDEBE8',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-sand)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--color-surface-border)'; }}
            />
            <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
              Formato internacional recomendado. Los viajeros te contactan directo acá.
            </p>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="bio"
              className="text-sm font-semibold"
              style={{ color: 'rgba(237,235,232,0.7)' }}
            >
              Descripción de tu negocio <span style={{ color: 'var(--color-sand)' }}>*</span>
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Contanos qué ofrecés, tu experiencia, qué hace especial a tu negocio..."
              required
              className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
              style={{
                background: 'var(--color-surface-3)',
                border: '1px solid var(--color-surface-border)',
                color: '#EDEBE8',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-sand)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--color-surface-border)'; }}
            />
          </div>

          {/* Destino */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="destination"
              className="text-sm font-semibold"
              style={{ color: 'rgba(237,235,232,0.7)' }}
            >
              Destino principal <span style={{ color: 'var(--color-sand)' }}>*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {DESTINOS.map((destino) => (
                <button
                  key={destino.slug}
                  type="button"
                  onClick={() => setFormData({ ...formData, destinationSlug: destino.slug })}
                  className="cursor-pointer h-12 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: formData.destinationSlug === destino.slug
                      ? 'rgba(196,149,106,0.15)'
                      : 'var(--color-surface-3)',
                    border: `1px solid ${formData.destinationSlug === destino.slug
                      ? 'var(--color-sand)'
                      : 'var(--color-surface-border)'}`,
                    color: formData.destinationSlug === destino.slug
                      ? 'var(--color-sand)'
                      : 'rgba(237,235,232,0.5)',
                  }}
                >
                  {destino.label}
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
              Tu perfil aparece en el feed de este destino.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm" style={{ color: '#EF4444' }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <div
            className="pt-4"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'var(--color-sand)',
                color: '#1A1A1A',
              }}
            >
              {loading ? 'Creando perfil...' : 'Guardar y empezar'}
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
