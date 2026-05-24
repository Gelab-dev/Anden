import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-turquoise">Andén</h3>
            <p className="mt-2 text-sm text-gray-400">
              La guía viva de cada destino argentino
            </p>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="font-semibold text-white">Destinos</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/puerto-madryn" className="text-sm text-gray-400 hover:text-turquoise transition-colors">
                  Puerto Madryn
                </Link>
              </li>
              <li>
                <Link href="/la-plata" className="text-sm text-gray-400 hover:text-turquoise transition-colors">
                  La Plata
                </Link>
              </li>
            </ul>
          </div>

          {/* Para prestadores */}
          <div>
            <h4 className="font-semibold text-white">Prestadores</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/login" className="text-sm text-gray-400 hover:text-turquoise transition-colors">
                  Registrar mi emprendimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-gray-400">
                  Términos y condiciones
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400">
                  Política de privacidad
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Andén. Hecho en Argentina 🇦🇷
          </p>
        </div>
      </div>
    </footer>
  );
}