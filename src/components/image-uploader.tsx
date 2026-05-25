'use client'

// src/components/image-uploader.tsx
// Componente reutilizable para upload de imágenes a Vercel Blob via /api/upload

import { useRef, useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  label: string
  hint?: string
  value: string[]               // URLs ya subidas
  onChange: (urls: string[]) => void
  multiple?: boolean            // false = solo una imagen (logo, cover)
  maxFiles?: number             // default 5
}

type UploadingFile = {
  id: string
  name: string
  preview: string               // object URL para preview local
  progress: 'uploading' | 'done' | 'error'
  error?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function ImageUploader({
  label,
  hint,
  value,
  onChange,
  multiple = true,
  maxFiles = 5,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState<UploadingFile[]>([])
  const [dragOver, setDragOver] = useState(false)

  const totalSlots = value.length + uploading.length
  const canAddMore = multiple ? totalSlots < maxFiles : totalSlots === 0

  // ── Upload de un archivo individual ──────────────────────────────────────

  async function uploadFile(file: File): Promise<string | null> {
    // Validaciones client-side
    if (!file.type.startsWith('image/')) {
      return null
    }
    if (file.size > 5 * 1024 * 1024) {
      return null
    }

    const id = `${Date.now()}-${Math.random()}`
    const preview = URL.createObjectURL(file)

    setUploading((prev) => [
      ...prev,
      { id, name: file.name, preview, progress: 'uploading' },
    ])

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setUploading((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, progress: 'error', error: data.error ?? 'Error al subir' }
              : f
          )
        )
        return null
      }

      // Upload exitoso — sacar de uploading, agregar a value
      setUploading((prev) => prev.filter((f) => f.id !== id))
      URL.revokeObjectURL(preview)
      return data.url as string
    } catch {
      setUploading((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, progress: 'error', error: 'Error de conexión' }
            : f
        )
      )
      return null
    }
  }

  // ── Procesar lista de archivos ────────────────────────────────────────────

  async function handleFiles(files: FileList | File[]) {
    const fileArray = Array.from(files)
    const remaining = maxFiles - value.length - uploading.length
    const toUpload = multiple ? fileArray.slice(0, remaining) : fileArray.slice(0, 1)

    const results = await Promise.all(toUpload.map(uploadFile))
    const newUrls = results.filter((url): url is string => url !== null)

    if (newUrls.length > 0) {
      onChange(multiple ? [...value, ...newUrls] : newUrls)
    }
  }

  // ── Eliminar imagen ya subida ─────────────────────────────────────────────

  function removeUrl(url: string) {
    onChange(value.filter((u) => u !== url))
  }

  function removeUploading(id: string) {
    setUploading((prev) => prev.filter((f) => f.id !== id))
  }

  // ── Drag and drop ─────────────────────────────────────────────────────────

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (canAddMore) setDragOver(true)
  }

  function onDragLeave() {
    setDragOver(false)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (!canAddMore) return
    handleFiles(e.dataTransfer.files)
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  const hasImages = value.length > 0 || uploading.length > 0

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <label className="text-sm font-semibold" style={{ color: 'rgba(237,235,232,0.7)' }}>
        {label}
      </label>

      {/* Zona de drop */}
      {canAddMore && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-2 py-8 px-4 text-center"
          style={{
            borderColor: dragOver
              ? 'var(--color-sand)'
              : 'var(--color-surface-border)',
            background: dragOver
              ? 'rgba(196,149,106,0.05)'
              : 'var(--color-surface-3)',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: 'rgba(237,235,232,0.25)' }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p className="text-sm" style={{ color: 'rgba(237,235,232,0.4)' }}>
            {multiple
              ? `Arrastrá imágenes o hacé click para seleccionar`
              : `Arrastrá una imagen o hacé click para seleccionar`}
          </p>
          <p className="text-xs" style={{ color: 'rgba(237,235,232,0.2)' }}>
            JPG, PNG, WebP · máx. 5MB
            {multiple && ` · hasta ${maxFiles} imágenes`}
          </p>
        </div>
      )}

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files)
          e.target.value = '' // reset para permitir re-subir el mismo archivo
        }}
      />

      {/* Previews */}
      {hasImages && (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: multiple
              ? 'repeat(auto-fill, minmax(100px, 1fr))'
              : '1fr',
          }}
        >
          {/* Imágenes ya subidas */}
          {value.map((url) => (
            <div
              key={url}
              className="relative rounded-xl overflow-hidden group"
              style={{ aspectRatio: multiple ? '1' : '16/9' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Imagen subida"
                className="w-full h-full object-cover"
              />
              {/* Overlay con botón eliminar */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeUrl(url)}
                  className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Archivos en proceso de upload */}
          {uploading.map((file) => (
            <div
              key={file.id}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: multiple ? '1' : '16/9' }}
            >
              {file.progress === 'error' ? (
                // Estado de error
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-2 p-3"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '12px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-xs text-center" style={{ color: '#EF4444' }}>
                    {file.error}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeUploading(file.id)}
                    className="cursor-pointer text-xs underline"
                    style={{ color: 'rgba(237,235,232,0.4)' }}
                  >
                    Descartar
                  </button>
                </div>
              ) : (
                // Subiendo — preview local con overlay de progreso
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: 'var(--color-sand)', borderTopColor: 'transparent' }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hint */}
      {hint && (
        <p className="text-xs" style={{ color: 'rgba(237,235,232,0.3)' }}>
          {hint}
        </p>
      )}

      {/* Contador */}
      {multiple && maxFiles > 1 && (
        <p className="text-xs" style={{ color: 'rgba(237,235,232,0.2)' }}>
          {value.length} de {maxFiles} imágenes
        </p>
      )}
    </div>
  )
}
