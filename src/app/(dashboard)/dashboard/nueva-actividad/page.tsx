'use client';

// src/app/(dashboard)/dashboard/nueva-actividad/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Transition as MotionTransition } from 'framer-motion';
import { ImageUploader } from '@/components/image-uploader';

type ActivityType = 'eventual' | 'recurrente';

const ESTADOS = [
  { value: 'OPERATING', label: 'Operando con normalidad' },
  { value: 'LIMITED',   label: 'Capacidad limitada' },
  { value: 'CLOSED',    label: 'Cerrado temporalmente' },
  { value: 'SOLD_OUT',  label: 'Sin cupos disponibles' },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
      style={{ color: 'var(--color-sand)' }}
    >
      {children}
    </h2>
  );
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
      {required && <span style={{ color: 'var(--color-sand)' }}> *</span>}
    </label>
  );
}

const inputStyle = {
  background: 'var(--color-surface-3)',
  border: '1px solid var(--color-surface-border)',
  color: '#EDEBE8',
};

const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'var(--color-sand)';
};

const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'var(--color-surface-border)';
};

export default function NuevaActividadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tipo, setTipo] = useState<ActivityType>('eventual');

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    priceFrom: '',
    priceTo: '',
    isFree: false,
    maxCapacity: '',
    whatsappMessage: '',
    status: 'OPERATING',
    statusNote: '',
    eventDate: '',
    eventEndDate: '',
    schedule: '',
    mediaUrls: [] as string[],
  });

  const set = (key: string, value: string | boolean | string[]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/activity/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tipo }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al crear actividad');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Error al crear actividad');
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-12 py-16">
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
            Nueva actividad
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display)', color: '#EDEBE8' }}
          >
            Publicá tu actividad
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Tipo de actividad */}
          <section>
            <SectionTitle>Tipo de actividad</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: 'eventual',   label: 'Eventual',    desc: 'Tiene fecha de inicio y fin.' },
                { value: 'recurrente', label: 'Recurrente',  desc: 'Se repite con horario fijo.' },
              ] as { value: ActivityType; label: string; desc: string }[]).map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTipo(t.value)}
                  className="cursor-pointer text-left p-5 rounded-xl transition-all duration-200"
                  style={{
                    background: tipo === t.value ? 'rgba(196,149,106,0.12)' : 'var(--color-surface-3)',
                    border: `1px solid ${tipo === t.value ? 'var(--color-sand)' : 'var(--color-surface-border)'}`,
                  }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: tipo === t.value ? 'var(--color-sand)' : '#EDEBE8' }}>
                    {t.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(237,235,232,0.4)' }}>
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Información básica */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Información básica</SectionTitle>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="title" required>Título</FieldLabel>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Ej: Tour guiado por lugares emblemáticos de la ciudad"
                required
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
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
                placeholder="Máx. 200 caracteres. Esta descripción aparece en la card del feed."
                required
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="long-desc">Descripción completa</FieldLabel>
              <textarea
                id="long-desc"
                value={formData.longDescription}
                onChange={(e) => set('longDescription', e.target.value)}
                rows={5}
                placeholder="Describí la experiencia en detalle: qué incluye, qué llevar, condiciones especiales..."
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </section>

          {/* Imágenes */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Imágenes</SectionTitle>
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
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>{tipo === 'eventual' ? 'Fechas' : 'Horarios'}</SectionTitle>

            {tipo === 'eventual' ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="event-date" required>Fecha de inicio</FieldLabel>
                  <input
                    id="event-date"
                    type="datetime-local"
                    value={formData.eventDate}
                    onChange={(e) => set('eventDate', e.target.value)}
                    required={tipo === 'eventual'}
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
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
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="schedule" required>Esquema de horarios</FieldLabel>
                <input
                  id="schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => set('schedule', e.target.value)}
                  placeholder="Ej: Martes, jueves y sábados — 9:00 y 14:00hs"
                  required={tipo === 'recurrente'}
                  className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                />
                <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
                  Describí cuándo se repite la actividad. Podés editarlo cuando cambie.
                </p>
              </div>
            )}
          </section>

          {/* Precio */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Precio</SectionTitle>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className="relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                style={{
                  background: formData.isFree ? 'var(--color-sand)' : 'var(--color-surface-3)',
                  border: '1px solid var(--color-surface-border)',
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
                    placeholder="25000"
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="price-to">Precio hasta (ARS)</FieldLabel>
                  <input
                    id="price-to"
                    type="number"
                    value={formData.priceTo}
                    onChange={(e) => set('priceTo', e.target.value)}
                    placeholder="35000"
                    className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Capacidad */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Capacidad</SectionTitle>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="capacity">Capacidad máxima</FieldLabel>
              <input
                id="capacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => set('maxCapacity', e.target.value)}
                placeholder="20"
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200 max-w-xs"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
              <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
                Cantidad máxima de personas por turno. Opcional.
              </p>
            </div>
          </section>

          {/* Estado */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Estado actual</SectionTitle>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="status" required>Estado</FieldLabel>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => set('status', e.target.value)}
                required
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200 cursor-pointer"
                style={{ ...inputStyle, colorScheme: 'dark' }}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              >
                {ESTADOS.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="status-note">Nota de estado</FieldLabel>
              <input
                id="status-note"
                type="text"
                value={formData.statusNote}
                onChange={(e) => set('statusNote', e.target.value)}
                placeholder="Ej: Suspendido por mal tiempo hasta el jueves"
                className="h-12 px-4 rounded-xl text-base outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
            </div>
          </section>

          {/* WhatsApp */}
          <section
            className="space-y-6 pt-12"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <SectionTitle>Contacto</SectionTitle>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="whatsapp-msg">Mensaje predefinido de WhatsApp</FieldLabel>
              <textarea
                id="whatsapp-msg"
                value={formData.whatsappMessage}
                onChange={(e) => set('whatsappMessage', e.target.value)}
                rows={3}
                placeholder="Hola! Vi tu actividad en Andén y me gustaría saber más. ¿Tienen disponibilidad?"
                className="px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 resize-none"
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
              <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
                Se envía automáticamente cuando alguien hace click en &ldquo;Consultar por WhatsApp&rdquo;.
              </p>
            </div>
          </section>

          {/* Error */}
          {error && (
            <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
          )}

          {/* Submit */}
          <div
            className="flex gap-4 pt-4"
            style={{ borderTop: '1px solid var(--color-surface-border)' }}
          >
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer flex-1 py-4 rounded-full text-base font-semibold tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--color-sand)', color: '#1A1A1A' }}
            >
              {loading ? 'Publicando...' : 'Publicar actividad'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer px-6 py-4 rounded-full text-base font-medium transition-all duration-200 hover:opacity-70"
              style={{
                border: '1px solid var(--color-surface-border)',
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
