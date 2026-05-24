'use client';

import Link from 'next/link';

interface DestinoPillProps {
  slug: string;
  name: string;
  count: number;
}

export function DestinoPill({ slug, name, count }: DestinoPillProps) {
  return (
    <Link href={`/${slug}`}>
      <div
        className="group flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,217,192,0.3)';
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,217,192,0.06)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
        }}
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-turquoise" />
        </div>
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-gray-500">{count}</span>
      </div>
    </Link>
  );
}