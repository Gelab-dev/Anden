'use client'

import Link from 'next/link'

export function EditButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <button
        className="cursor-pointer px-4 py-2 rounded-lg text-sm transition-all duration-200
        text-white/50 border border-white/8
        hover:text-sand hover:border-[rgba(196,149,106,0.4)] hover:bg-[rgba(196,149,106,0.08)]"
        style={{
          color: 'rgba(237,235,232,0.5)',
          border: '0.5px solid var(--color-surface-border)',
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget
          t.style.color = 'var(--color-sand)'
          t.style.borderColor = 'rgba(196,149,106,0.4)'
          t.style.background = 'rgba(196,149,106,0.08)'
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget
          t.style.color = 'rgba(237,235,232,0.5)'
          t.style.borderColor = 'var(--color-surface-border)'
          t.style.background = 'transparent'
        }}
      >
        Editar
      </button>
    </Link>
  )
}