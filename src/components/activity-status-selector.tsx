'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

interface ActivityStatusSelectorProps {
  activityId: string;
  currentStatus: string;
  currentNote: string | null;
  activityTitle: string;
}

const ESTADOS = [
  {
    value: 'OPERATING',
    label: 'Operando',
    desc: 'Todo normal',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    value: 'LIMITED',
    label: 'Cupo limitado',
    desc: 'Quedan pocos lugares',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    value: 'SOLD_OUT',
    label: 'Sin cupos',
    desc: 'No hay disponibilidad',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    value: 'CLOSED',
    label: 'Cerrado',
    desc: 'No opera hoy',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
  },
] as const;

export function ActivityStatusSelector({
  activityId,
  currentStatus,
  currentNote,
  activityTitle,
}: ActivityStatusSelectorProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote || '');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setStatus(currentStatus);
    setNote(currentNote || '');
    setError('');
  }, [currentStatus, currentNote]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleCancel]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSaved(false);

    try {
      const response = await fetch('/api/activity/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, status, statusNote: note }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al actualizar');
        return;
      }

      setSaved(true);
      setOpen(false);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const currentEstado = ESTADOS.find((e) => e.value === status) ?? ESTADOS[0];

  const modal = typeof window !== 'undefined' && open ? createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleCancel(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
        style={{
          background: 'var(--color-board-2)',
          border: '1px solid var(--color-board-line)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p
              className="text-xs font-mono tracking-widest uppercase mb-1"
              style={{ color: 'rgba(237,235,232,0.4)' }}
            >
              Cambiar estado
            </p>
            <p className="text-sm font-semibold" style={{ color: '#EDEBE8' }}>
              {activityTitle}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="cursor-pointer p-1 rounded-lg transition-opacity hover:opacity-60"
            style={{ color: 'rgba(237,235,232,0.4)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Opciones */}
        <div className="space-y-2 mb-5">
          {ESTADOS.map((estado) => (
            <button
              key={estado.value}
              onClick={() => setStatus(estado.value)}
              className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150"
              style={{
                background: status === estado.value ? estado.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${status === estado.value ? estado.border : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: estado.color }}
              />
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: status === estado.value ? estado.color : '#EDEBE8' }}
                >
                  {estado.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(237,235,232,0.35)' }}>
                  {estado.desc}
                </p>
              </div>
              {status === estado.value && (
                <svg className="w-4 h-4 shrink-0" style={{ color: estado.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Nota */}
        <div className="mb-5">
          <label
            className="text-xs mb-2 block"
            style={{ color: 'rgba(237,235,232,0.5)' }}
          >
            Nota opcional
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej: Vuelve el jueves, suspendido por lluvia..."
            className="w-full h-10 px-3 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--color-board-3)',
              border: '1px solid var(--color-board-line)',
              color: '#EDEBE8',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-signal)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-board-line)'; }}
          />
        </div>

        {error && (
          <p className="text-xs mb-4" style={{ color: '#EF4444' }}>{error}</p>
        )}

        {/* Acciones */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="cursor-pointer flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'var(--color-signal)', color: '#1A1A1A' }}
          >
            {loading ? 'Guardando...' : 'Guardar cambio'}
          </button>
          <button
            onClick={handleCancel}
            className="cursor-pointer px-5 py-3 rounded-full text-sm transition-all duration-200 hover:opacity-70"
            style={{
              border: '1px solid var(--color-board-line)',
              color: 'rgba(237,235,232,0.4)',
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="flex items-center gap-3">
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-80"
        style={{
          color: currentEstado.color,
          background: currentEstado.bg,
          border: `1px solid ${currentEstado.border}`,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: currentEstado.color }}
        />
        {currentEstado.label}
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {saved && (
        <span className="text-xs font-medium" style={{ color: '#10B981' }}>
          ✓ Actualizado
        </span>
      )}

      {modal}
    </div>
  );
}