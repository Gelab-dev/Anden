import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NavbarComercial } from './components/navbar-comercial';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Andén para negocios — Tu actividad, visible cuando importa',
  description:
    'Andén es la cartelera cultural y turística de tu ciudad. Publicá tus actividades y aparecé en el momento justo.',
  keywords: [
    'turismo argentina',
    'publicar actividades turísticas',
    'visibilidad para negocios turísticos',
    'agenda cultural argentina',
    'excursiones puerto madryn',
    'eventos la plata',
  ],
  openGraph: {
    title: 'Andén para negocios — Tu actividad, visible cuando importa',
    description:
      'Llegá al viajero en el momento exacto que está listo para reservar. Sin comisiones, sin burocracia.',
    siteName: 'Andén',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andén para negocios',
    description:
      'Publicá tus actividades y llegá a viajeros que ya están en tu destino.',
  },
};

export default function ComercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        background: 'var(--color-cream)',
        color: 'var(--color-ink)',
        minHeight: '100vh',
      }}
    >
      <NavbarComercial />
      {children}
    </div>
  );
}