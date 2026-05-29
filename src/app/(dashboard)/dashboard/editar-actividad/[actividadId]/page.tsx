'use client';

// src/app/(dashboard)/dashboard/editar-actividad/[actividadId]/page.tsx

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import Link from 'next/link';
import { ImageUploader } from '@/components/image-uploader';

interface PageProps {
  params: Promise<{ actividadId: string }>;
}

function FieldLabel({ htmlFor, children, required }: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold"
      style={{ color: 'rgba(237,235,232,0.7)' }}
    >
      {children}
      {required && <span style={{ color: 'var(--color-signal)' }}> *</span>}
    </label>
  );
}

const inputStyle = {
  background: 'var(--color-board-3)',
  border: '1px solid var(--color-board-line)',
  color: '#EDEBE8',
};

const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'var(--color-signal)';
};

const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'var(--color-board-line)';
};

export default function EditarActividadPage({ params }: PageProps) {
  const { actividadId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    priceFrom: '',
    priceTo: '',
    isFree: false,
    maxCapacity: '',
    whatsappMessage: '',
    statusNote: '',
    eventDate: '',
    eventEndDate: '',
    schedule: '',
    isRecurring: false,
    mediaUrls: [] as string[],    // URLs de imágenes — se pre-cargan desde la API
  });

  // Cargar datos de la actividad (incluyendo media)
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch(`/api/activity/${actividadId}`);
        if (!res.ok) {
          setError('Actividad no encontrada');
          return;
        }
        const data = await res.json();
        const a = data.activity;
        const scheduleData = a.schedule as { texto?: string } | null;

        setFormData({
          title: a.title || '',
          shortDescription: a.shortDescription || '',
          longDescription: a.longDescription || '',
          priceFrom: a.priceFrom ? String(a.priceFrom) : '',
          priceTo: a.priceTo ? String(a.priceTo) : '',
          isFree: a.isFree || false,
          maxCapacity: a.maxCapacity ? String(a.maxCapacity) : '',
          whatsappMessage: a.whatsappMessage || '',
          statusNote: a.statusNote || '',
          eventDate: a.startDate
            ? new Date(a.startDate).toISOString().slice(0, 16)
            : '',
          eventEndDate: a.endDate
            ? new Date(a.endDate).toISOString().slice(0, 16)
            : '',
          schedule: scheduleData?.texto || '',
          isRecurring: a.isRecurring || false,
          // Pre-cargar imágenes existentes ordenadas por campo order
          mediaUrls: (a.media ?? [])
            .sort((x: { order: number }, y: { order: number }) => x.order - y.order)
            .map((m: { url: string }) => m.url),
        });
      } catch {
        setError('Error al cargar la actividad');
      } finally {
        setFetching(false);
      }
    }

    fetchActivity();
  }, [actividadId]);

  const set = (key: string, value: string | boolean | string[]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/activity/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId: actividadId, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al actualizar');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Error al conectar con el servidor');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl animate-pulse"
              style={{ background: 'var(--color-board-2)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 text-center">
        <p style={{ color: '#EF4444' }}>{error}</p>
        <Link href="/dashboard" className="text-sm mt-4 block" style={{ color: 'rgba(237,235,232,0.4)' }}>
          ← Volver al panel
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as MotionTransition['ease'] }}
      >
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-xs mb-6 block transition-opacity hover:opacity-70"
            style={{ color: 'rgba(237,235,232,0.35)' }}
          >
            ← Volver al panel
          </Link>
          <p
            className="text-xs font-mono tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--color-signal)' }}
          >
            Editar actividad
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display)', color: '#EDEBE8' }}
          >
            {formData.title || 'Editando...'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Información básica */}
          <section className="space-y-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-signal)' }}>
              Información básica
            </p>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="title" required>Título</FieldLabel>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => set('title', e.target.value)}
                required
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="short-desc" required>Descripción corta</FieldLabel>
              <textarea
                id="short-desc"
                value={formData.shortDescription}
                onChange={(e) => set('shortDescription', e.target.value)}
                rows={2}
                maxLength={200}
                required
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="long-desc">Descripción completa</FieldLabel>
              <textarea
                id="long-desc"
                value={formData.longDescription}
                onChange={(e) => set('longDescription', e.target.value)}
                rows={5}
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </section>

          {/* Imágenes */}
          <section
            className="space-y-6 pt-10"
            style={{ borderTop: '1px solid var(--color-board-line)' }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-signal)' }}>
              Imágenes
            </p>
            <ImageUploader
              label="Fotos de la actividad"
              hint="La primera imagen es la principal que aparece en el feed. Recomendamos fotos horizontales."
              multiple
              maxFiles={5}
              value={formData.mediaUrls}
              onChange={(urls) => set('mediaUrls', urls)}
            />
          </section>

          {/* Fechas / Horarios */}
          <section
            className="space-y-6 pt-10"
            style={{ borderTop: '1px solid var(--color-board-line)' }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-signal)' }}>
              {formData.isRecurring ? 'Horarios' : 'Fechas'}
            </p>

            {formData.isRecurring ? (
              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="schedule">Esquema de horarios</FieldLabel>
                <input
                  id="schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => set('schedule', e.target.value)}
                  placeholder="Ej: Martes, jueves y sábados — 9:00 y 14:00hs"
                  className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="event-date">Fecha de inicio</FieldLabel>
                  <input
                    id="event-date"
                    type="datetime-local"
                    value={formData.eventDate}
                    onChange={(e) => set('eventDate', e.target.value)}
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="event-end-date">Fecha de fin</FieldLabel>
                  <input
                    id="event-end-date"
                    type="datetime-local"
                    value={formData.eventEndDate}
                    onChange={(e) => set('eventEndDate', e.target.value)}
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Precio */}
          <section
            className="space-y-6 pt-10"
            style={{ borderTop: '1px solid var(--color-board-line)' }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-signal)' }}>
              Precio
            </p>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className="relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                style={{
                  background: formData.isFree ? 'var(--color-signal)' : 'var(--color-board-3)',
                  border: '1px solid var(--color-board-line)',
                }}
                onClick={() => set('isFree', !formData.isFree)}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200"
                  style={{
                    background: '#EDEBE8',
                    transform: formData.isFree ? 'translateX(1.1rem)' : 'translateX(0.1rem)',
                  }}
                />
              </div>
              <span className="text-sm" style={{ color: 'rgba(237,235,232,0.7)' }}>
                Actividad gratuita
              </span>
            </label>

            {!formData.isFree && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="price-from">Precio desde (ARS)</FieldLabel>
                  <input
                    id="price-from"
                    type="number"
                    value={formData.priceFrom}
                    onChange={(e) => set('priceFrom', e.target.value)}
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="price-to">Precio hasta (ARS)</FieldLabel>
                  <input
                    id="price-to"
                    type="number"
                    value={formData.priceTo}
                    onChange={(e) => set('priceTo', e.target.value)}
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Capacidad y contacto */}
          <section
            className="space-y-6 pt-10"
            style={{ borderTop: '1px solid var(--color-board-line)' }}
          >
            <p className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-signal)' }}>
              Capacidad y contacto
            </p>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="capacity">Capacidad máxima</FieldLabel>
              <input
                id="capacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => set('maxCapacity', e.target.value)}
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200 max-w-xs"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="whatsapp-msg">Mensaje de WhatsApp</FieldLabel>
              <textarea
                id="whatsapp-msg"
                value={formData.whatsappMessage}
                onChange={(e) => set('whatsappMessage', e.target.value)}
                rows={3}
                placeholder="Hola! Vi tu actividad en Andén y me gustaría saber más."
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </section>

          {error && (
            <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
          )}

          {/* Submit */}
          <div
            className="flex gap-4 pt-4"
            style={{ borderTop: '1px solid var(--color-board-line)' }}
          >
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer flex-1 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--color-signal)', color: '#1A1A1A' }}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer px-6 py-4 rounded-full text-base font-medium transition-all duration-200 hover:opacity-70"
              style={{
                border: '1px solid var(--color-board-line)',
                color: 'rgba(237,235,232,0.5)',
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
