import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '@/components/session-provider';

export const metadata: Metadata = {
  title: 'Andén',
  description: 'La vida real de cada destino argentino.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}