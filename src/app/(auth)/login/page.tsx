'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('modo') === 'registro');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Error al registrar');
          setLoading(false);
          return;
        }

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Cuenta creada pero error al iniciar sesión');
        } else {
          router.push('/dashboard/crear-perfil');
          router.refresh();
        }
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Email o contraseña incorrectos');
        } else {
          router.push('/dashboard');
          router.refresh();
        }
      }
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#EDEBE8',
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'var(--color-signal)';
    e.target.style.background = 'rgba(255,255,255,0.06)';
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'var(--color-board-2)' }}
    >
      {/* Panel izquierdo — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link
          href="/"
          className="font-black text-2xl tracking-tight transition-opacity hover:opacity-70"
          style={{ fontFamily: 'var(--font-display)', color: '#EDEBE8' }}
        >
          Andén
        </Link>

        <div>
          <p
            className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
            style={{ color: 'var(--color-signal)' }}
          >
            Para negocios
          </p>
          <h2
            className="font-black tracking-[-0.03em] text-white mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              lineHeight: 1.0,
            }}
          >
            Tu próximo cliente
            ya está pensando
            qué hacer hoy.
          </h2>
          <p style={{ color: 'rgba(237,235,232,0.45)', lineHeight: 1.7 }}>
            Andén es la cartelera cultural y turística de tu ciudad.
            Publicá tus actividades y aparecé en el momento justo.
          </p>
        </div>

        <p
          className="text-xs"
          style={{ color: 'rgba(237,235,232,0.2)' }}
        >
          © 2026 Andén · La vida real de cada destino argentino
        </p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <Link
            href="/"
            className="lg:hidden block font-black text-2xl tracking-tight mb-10 transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-display)', color: '#EDEBE8' }}
          >
            Andén
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1
              className="font-black tracking-[-0.02em] text-white mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
              }}
            >
              {isSignUp ? 'Crear cuenta' : 'Bienvenido'}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(237,235,232,0.45)' }}>
              {isSignUp
                ? 'Registrate gratis y publicá tus actividades.'
                : 'Iniciá sesión para gestionar tus actividades.'}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium"
                  style={{ color: 'rgba(237,235,232,0.6)' }}
                >
                  Nombre del negocio
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Patagonia Explorers"
                  autoComplete="organization"
                  required
                  className="h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: 'rgba(237,235,232,0.6)' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                required
                className="h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
                style={{ color: 'rgba(237,235,232,0.6)' }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'Mínimo 8 caracteres' : '••••••••'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                className="h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: '#EF4444' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full h-11 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ background: 'var(--color-signal)', color: '#1A1A1A' }}
            >
              {loading
                ? 'Un momento...'
                : isSignUp
                  ? 'Crear cuenta gratis'
                  : 'Ingresar'}
            </button>
          </form>

          {/* Toggle */}
          <p
            className="text-center text-sm mt-6"
            style={{ color: 'rgba(237,235,232,0.35)' }}
          >
            {isSignUp ? '¿Ya tenés cuenta?' : '¿No tenés cuenta?'}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="cursor-pointer font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-signal)' }}
            >
              {isSignUp ? 'Iniciá sesión' : 'Registrate gratis'}
            </button>
          </p>

          {/* Volver */}
          <p className="text-center mt-4">
            <Link
              href="/comercial"
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: 'rgba(237,235,232,0.2)' }}
            >
              ← Volver a Andén para negocios
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}