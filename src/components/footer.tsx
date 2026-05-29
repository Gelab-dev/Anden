import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-board-2)',
        borderTop: '1px solid var(--color-board-line)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3
              className="text-xl font-black tracking-tight"
              style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-display)' }}
            >
              Andén
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-cream)', opacity: 0.4 }}>
              La vida real de cada destino argentino.
            </p>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--color-cream)' }}>
              Destinos
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/puerto-madryn"
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-cream)', opacity: 0.45 }}
                >
                  Puerto Madryn
                </Link>
              </li>
              <li>
                <Link
                  href="/la-plata"
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-cream)', opacity: 0.45 }}
                >
                  La Plata
                </Link>
              </li>
            </ul>
          </div>

          {/* Para prestadores */}
          <div>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--color-cream)' }}>
              Prestadores
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-cream)', opacity: 0.45 }}
                >
                  Registrar mi emprendimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--color-cream)' }}>
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm" style={{ color: 'var(--color-cream)', opacity: 0.3 }}>
                  Términos y condiciones
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'var(--color-cream)', opacity: 0.3 }}>
                  Política de privacidad
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-8 text-center"
          style={{ borderTop: '1px solid var(--color-board-line)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-cream)', opacity: 0.25 }}>
            © {new Date().getFullYear()} Andén. Hecho en Argentina.
          </p>
        </div>
      </div>
    </footer>
  );
}
