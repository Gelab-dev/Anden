# CLAUDE.md — Andén

Contexto permanente para Claude Code. Leé esto antes de tocar nada.

## Qué es Andén

Plataforma web mobile-first que centraliza la oferta turística y cultural de cada
destino argentino en un feed vivo, actualizado en tiempo real por los prestadores.
La línea de marca: **Andén es el tablero de salidas de cada ciudad.**

Marketplace de dos lados: viajero/local (consume el feed) y prestador (publica).
No procesa pagos ni cobra comisiones en el MVP; el contacto es por WhatsApp directo.

## Documentos fuente (leelos cuando necesites contexto)

- `docs/ANDEN.md` — fuente única de verdad: producto, negocio, roadmap.
- `docs/HANDOFF.md` — estado técnico y pendientes de pre-lanzamiento (orden de trabajo).
- `docs/BRAND.md` — identidad de marca canónica (color, tipografía, voz, logo).
- `docs/CONTRIBUTING.md` — convenciones de git, código y UI.
- `docs/adr/` — decisiones arquitectónicas.

Si una instrucción mía contradice estos docs, avisame antes de seguir; no asumas.

## Stack (versiones pineadas, no actualizar sin ADR)

Next.js 16.2 (App Router) · React 19.2 · TypeScript 5.8 estricto · Tailwind v4 ·
Prisma 7 (+ @prisma/adapter-pg) · PostgreSQL/Neon · NextAuth v5 · Framer Motion 12 ·
next-intl · pnpm. Node 22 LTS (ver `.nvmrc`).

## Reglas de código que importan

- **Server Components por defecto.** `'use client'` solo con event handlers, hooks o browser APIs.
- **TypeScript estricto, sin `any`.** Si no hay alternativa, comentá el porqué.
- **Tailwind v4:** sin `tailwind.config.js`; tokens en `@theme {}` en `globals.css`.
  `shrink-0` (no `flex-shrink-0`), `bg-linear-to-b` (no `bg-gradient-to-b`).
  `cursor-pointer` en interactivos.
- **Nunca hex hardcodeado.** Usar tokens del sistema (`var(--color-...)`).
- **Next 16:** `params`, `searchParams`, `cookies()`, `headers()` son async.
  El interceptor es `proxy.ts` (no `middleware.ts`), función exportada `proxy`.
- **Autorización:** el `proxy.ts` es solo borde de red. La authz REAL (ownership,
  roles) va en un helper compartido (`lib/authz.ts`) llamado dentro de cada route
  handler y server action. Nunca confiar solo en el proxy.
- **Carpetas:** kebab-case sin guiones bajos. Componentes PascalCase. Hooks `useX`.
  Route Groups: `(public)`, `(comercial)`, `(auth)`, `(dashboard)`. Componente
  colocado junto a su `page.tsx`; extraer a `components/` solo si se comparte.

## Marca (no negociable)

- **Acento = ámbar `signal` (#FF9F1C). NO turquesa.** Si encontrás turquesa viejo
  (#00d9c0, #00A896), es deuda a migrar a los tokens nuevos.
- **Fondos:** feed y dashboard = `board` (#17140F, negro cálido). Landing = `cream` (#F4ECDC).
- **Tipografía:** Bricolage Grotesque (títulos) · DM Sans (UI/cuerpo) · DM Mono (datos).
- **Datos siempre en mono:** hora, cupo, estado, fecha, distancia, contador.
- **Estados:** activo #1FA866 · demorado #F2C94C · completo #E5484D · suspendido #8A8378.
  El color NUNCA va solo: siempre con etiqueta de texto (accesibilidad AA).

## Voz

Escribí como un tablero de salidas: presente, preciso, estado primero, hora exacta,
cero relleno. Voseo argentino ("encontrá", "registrate"), sin folclore, sin
exclamaciones múltiples, sin emojis en UI. Inglés solo donde no hay español natural.

## Git

- Conventional Commits: `tipo(scope): descripción imperativa`. Tipos: feat, fix,
  refactor, perf, style, docs, test, chore, ci. El "por qué" va en el body.
- Feature branches a `main` vía PR. No commitees a `main` directo, no commitees WIP.
- Antes de pushear: `pnpm lint`, `pnpm typecheck`, `pnpm format`.

## Cómo trabajar conmigo

- Tareas chicas y verificables. Mostrame el plan antes de cambios grandes.
- Después de editar, corré typecheck/lint y reportá el resultado.
- Pedime permiso antes de: agregar dependencias, cambiar el schema de Prisma,
  tocar `proxy.ts`/auth, o cualquier cosa irreversible.
