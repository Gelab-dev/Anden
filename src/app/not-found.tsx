import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--color-dark-900)' }}
    >
      {/* Número grande de fondo */}
      <div
        className="absolute text-[20rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: 'rgba(255,255,255,0.02)',
          fontFamily: 'var(--font-playfair)',
        }}
        aria-hidden="true"
      >
        404
      </div>

      <div className="relative z-10">
        <p
          className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
          style={{ color: '#00D9C0' }}
        >
          Página no encontrada
        </p>

        <h1
          className="font-black tracking-[-0.03em] text-white mb-4"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.0,
          }}
        >
          Este andén no existe.
        </h1>

        <p
          className="text-lg mb-10 max-w-md mx-auto"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          La página que buscás no existe o fue movida.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <button
              className="cursor-pointer px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90"
              style={{ background: '#00D9C0', color: '#0D1B2A' }}
            >
              Ir al inicio
            </button>
          </Link>
          <Link href="/comercial">
            <button
              className="cursor-pointer px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-70"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Para negocios
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
