# HANDOFF — Estado de Andén (Mayo 2026)

**Fecha:** 2026-05-28
**Para:** Próxima sesión de desarrollo
**Estado:** MVP v1.0 (build) completo · identidad v2.0 definida · pendientes de pre-lanzamiento listados abajo

---

## Estado general

El build del MVP está funcionando. Esta sesión cerró la **identidad de marca** (tablero
de salidas) y resolvió un conjunto de decisiones de producto y código que estaban
abiertas. Lo que sigue ahora es aplicar esos cambios sobre el código y cerrar los
bloqueantes de lanzamiento.

Cambios de esta sesión:
- Identidad visual nueva: ámbar `signal` (se elimina turquesa), negro tablero, crema, Bricolage Grotesque + DM Sans + DM Mono. Ver `BRAND.md`, `globals.css`, `anden-isotipo.svg`, ADR 004.
- Decisiones de producto/código resueltas (sección "Decisiones de esta sesión").

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx                    ← root: html + body + globals.css + SessionProvider + fuentes (next/font)
│   ├── globals.css                   ← tokens de marca v2.0 (Tailwind v4 @theme) ← ACTUALIZAR
│   ├── not-found.tsx
│   ├── (public)/                     ← feed viajero: navbar oscura + footer
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← home: hero + destinos + actividades destacadas
│   │   └── [destinoSlug]/
│   │       ├── page.tsx              ← feed del destino (orden canónico + frescura)
│   │       ├── activity-card.tsx     ← card con estado, frescura (mono) y WhatsApp
│   │       ├── destino-pill.tsx
│   │       └── [actividadSlug]/
│   │           ├── page.tsx
│   │           └── whatsapp-button.tsx
│   ├── (comercial)/                  ← landing prestadores: navbar crema + fondo crema
│   │   └── comercial/...             ← (igual que antes; revisar mapa-3d perf)
│   ├── (auth)/
│   │   └── login/page.tsx            ← login + registro, ?modo=registro
│   ├── (dashboard)/                  ← panel prestador: navbar propia + tablero oscuro
│   │   └── dashboard/
│   │       ├── page.tsx              ← stats + lista actividades + "Confirmar para hoy"
│   │       ├── crear-perfil/page.tsx
│   │       ├── nueva-actividad/page.tsx
│   │       └── editar-actividad/[actividadId]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── register/
│       ├── provider/create/          ← POST: crea perfil + asigna rol (transacción)
│       ├── activity/
│       │   ├── create/               ← POST  (verifica límite anti-spam si no verificado)
│       │   ├── update/               ← PATCH (verifica ownership ← AGREGAR)
│       │   ├── update-status/        ← PATCH (verifica ownership ← AGREGAR)
│       │   ├── confirm/              ← POST: actualiza lastConfirmedAt ← NUEVO
│       │   └── [actividadId]/        ← GET
│       └── admin/verify-provider/    ← PATCH: cambia Provider.status (rol ADMIN) ← NUEVO
├── proxy.ts                          ← borde de red (Next 16, antes middleware.ts)
├── components/
│   ├── navbar.tsx
│   ├── navbar-dashboard.tsx
│   ├── activity-status-selector.tsx
│   ├── freshness-badge.tsx           ← "Confirmado hace 2 h" (mono) ← NUEVO
│   ├── footer.tsx
│   ├── session-provider.tsx
│   └── ui/ (button, badge, card, input)
└── lib/
    ├── auth.ts
    ├── authz.ts                      ← assertOwnsActivity, assertRole ← NUEVO
    └── prisma.ts
```

---

## Stack verificado

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js | 16.2.x |
| Runtime | Node.js | 20.9+ LTS |
| Lenguaje | TypeScript estricto | 5.8.x |
| UI | React | 19.2.x |
| Estilos | Tailwind CSS | 4.1.x |
| ORM | Prisma | 7.x (+ @prisma/adapter-pg) |
| DB | PostgreSQL / Neon | PG 17 |
| Auth | NextAuth v5 | 5.x |
| Animaciones | Framer Motion | 12.x |
| i18n | next-intl (sobre proxy.ts) | última estable |
| Errores | Sentry | última estable |
| Fuentes | Bricolage Grotesque + DM Sans + DM Mono | Google Fonts |
| Hosting | Vercel | — |

> **Pinear versiones exactas** en `package.json` + lockfile. Sin rangos.

---

## Decisiones de esta sesión (aplicar sobre el código)

### Identidad visual
1. **Reemplazar tokens** en `globals.css` por los de la v2.0 (archivo provisto). Quita turquesa, agrega `board` / `cream` / `signal` / estados.
2. **Cargar fuentes** con `next/font/google`: Bricolage Grotesque (display), DM Sans (sans), DM Mono (mono); mapear a `--font-bricolage`, `--font-dm-sans`, `--font-dm-mono`.
3. **Quitar Playfair.** Títulos → `font-display`. Datos (hora/cupo/estado) → `font-mono`.
4. **Buscar y reemplazar** todo uso de hex turquesa (`#00d9c0`, `#00A896`, etc.) por tokens nuevos.

### Producto
5. **`lastConfirmedAt: DateTime?`** en `Activity`. Endpoint `POST /api/activity/confirm`. Componente `freshness-badge.tsx` que muestra tiempo relativo en mono.
6. **Orden del feed** explícito: relevante-ahora → frescura → proximidad (post-MVP); de-rankear stale (>7d) y no verificado.
7. **Anti-spam:** prestador no VERIFIED limitado a 3 actividades activas (validar en `activity/create`).
8. **Onboarding:** primera actividad con campos mínimos; políticas completas requeridas para VERIFIED, no para publicar.
9. **Empty states** que redirigen (otros destinos / próximas / "avisame"), nunca dead-end.
10. **Reemplazar el buscador visual** no funcional por filtro real destino/categoría client-side con searchParams.

### Código / seguridad
11. **Authz por ownership** en `update`, `update-status`, `confirm`, delete. Helper en `lib/authz.ts` (patrón abajo). **No** apoyarse solo en `proxy.ts`: el proxy es borde de red; los chequeos van en route handlers / server actions.
12. **Tests** mínimos: (a) transacción `provider/create` que actualiza el rol; (b) endpoints de estado/confirm; (c) que un usuario no pueda mutar la actividad de otro.
13. **Sentry** cableado desde el primer deploy.
14. **Verificar que el upload de imágenes** (Vercel Blob + modelo `Media`) esté implementado. Si no, es bloqueante: un feed de descubrimiento sin galería queda plano.
15. **mapa-3d:** medir LCP/CLS en mobile gama media; lazy-load y respetar `prefers-reduced-motion`.

### Estrategia / operación
16. **SEO dentro del MVP:** sitemap, schema.org (Event/LocalBusiness), OG dinámico, metadata por ruta.
17. **Panel admin** (`/api/admin/verify-provider`, rol ADMIN) en vez de verificar con Prisma Studio.
18. **Legal pre-lanzamiento:** T&C, política de privacidad (Ley 25.326), consentimiento de cookies.
19. **Arranque en frío:** poblar Madryn por una vertical densa (avistajes + excursiones) antes que dispersar.

### Patrón de autorización

```ts
// lib/authz.ts
import { prisma } from "@/lib/prisma";

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function assertOwnsActivity(activityId: string, userId: string) {
  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
    select: { provider: { select: { ownerId: true } } },
  });
  if (!activity) throw new HttpError(404, "Actividad inexistente");
  if (activity.provider.ownerId !== userId) throw new HttpError(403, "No autorizado");
}

export function assertRole(role: string, allowed: string[]) {
  if (!allowed.includes(role)) throw new HttpError(403, "No autorizado");
}
```

---

## Convenciones confirmadas

**Archivos y carpetas:** `kebab-case` sin guiones bajos
**Componentes exportados:** `PascalCase` dentro del archivo
**Route Groups:** `(public)`, `(comercial)`, `(auth)`, `(dashboard)` — componentes colocados junto a su `page.tsx`; extraer a `components/` solo si se comparte
**Proxy (Next.js 16):** `src/proxy.ts` (función `proxy`), no `middleware.ts`. Auth real en `lib/` + handlers, no en el proxy.

**Tailwind v4:**
- `shrink-0` no `flex-shrink-0`
- `bg-linear-to-b` no `bg-gradient-to-b`
- Sin `tailwind.config.js` — tokens en `@theme {}` en `globals.css`
- Tokens del sistema, no hex hardcodeados
- `cursor-pointer` en interactivos

**Datos en mono:** hora, cupo, estado, fecha, distancia, contador → `font-mono` (`.tabular`).

---

## Paleta de colores (v2.0)

### El tablero — oscuros (feed + dashboard)
```css
--color-board:      #17140F   /* fondo principal */
--color-board-2:    #211C16   /* surface elevada */
--color-board-3:    #2C261D   /* surface 2 */
--color-board-line: rgba(244,236,220,0.08)
```

### El boleto — claros (landing /comercial)
```css
--color-cream:    #F4ECDC
--color-cream-2:  #EAE0CC
--color-ink:      #1E1A14
--color-ink-soft: #6E6353
```

### La señal — acento
```css
--color-signal:        #FF9F1C   /* CTAs, links, "en vivo" */
--color-signal-bright: #FFC152
--color-signal-deep:   #B86A0A   /* texto-acento sobre crema */
```

### Estados (= señales del tablero)
```css
--color-activo:     #1FA866
--color-demorado:   #F2C94C
--color-completo:   #E5484D
--color-suspendido: #8A8378
```

---

## Decisiones de diseño

**Línea de marca:** Andén es el tablero de salidas de cada ciudad. El sistema de
estados *es* un tablero; marca y producto comparten concepto. Detalle en `BRAND.md`.

**Landing /comercial:** crema "boleto", cálida y editorial. Bricolage en titulares,
DM Sans en cuerpo, ámbar en CTAs.

**Dashboard y feed:** "el tablero" — negro cálido `#17140F`. Ámbar como acento, datos
en DM Mono. Mismo mundo visual que la landing, en versión nocturna.

**Continuidad:** las tres superficies comparten ámbar + las tres tipografías. El
usuario no siente que cambió de app.

---

## Lógica de negocio clave

**Tipos de actividad:** `eventual` (fecha inicio/fin) o `recurrente` (esquema fijo). Campo `isRecurring`.

**Estados:** `OPERATING`, `LIMITED`, `SOLD_OUT`, `CLOSED`, `SCHEDULED`. Cambio desde dashboard con modal. `PATCH /api/activity/update-status`.

**Frescura:** `lastConfirmedAt` se muestra como tiempo relativo. Acción "Confirmar para hoy" en el dashboard. No obliga a tocar nada cada día, pero no miente al viajero.

**Verificación:** prestadores arrancan `PENDING`; aparecen en el feed solo en `VERIFIED`. Verificación vía panel admin (rol ADMIN), no Prisma Studio. No verificado → máx. 3 actividades activas.

**Roles:** `TRAVELER` (default), `PROVIDER_OWNER` (al crear perfil, misma transacción), `ADMIN`.

**WhatsApp:** botón abre `wa.me/{numero}?text={mensaje}` vía redirect propio de Andén (para tracking). Sin intermediación, contacto directo.

**El feed no toca plata:** sin pagos ni comisiones en el MVP.

---

## Pendientes de pre-lanzamiento (orden sugerido)

1. Migrar tokens + fuentes (identidad v2.0) y barrer turquesa.
2. Authz por ownership + `lib/authz.ts` + tests de seguridad.
3. `lastConfirmedAt` + endpoint confirm + `freshness-badge`.
4. Orden del feed + de-ranking + anti-spam.
5. Panel admin de verificación.
6. SEO técnico (sitemap, schema.org, OG, metadata).
7. Empty states + filtro real (saca el buscador visual).
8. Sentry + verificar Vercel Blob + medir mapa-3d.
9. Legal: T&C, privacidad (Ley 25.326), cookies.
10. Poblar vertical densa de Madryn → deploy `anden.com.ar`.

---

## Próximos pasos post-MVP

1. Inglés en fichas (Madryn) con next-intl.
2. Recordatorio automático por WhatsApp la noche anterior (Twilio).
3. Editar perfil del prestador.
4. Reseñas verificadas.
5. Cuenta de viajero (favoritos, seguimiento, alertas por email).
6. Andén Pro — métricas avanzadas, posicionamiento destacado.
7. Proximidad/geo en el orden del feed.

---

## Contexto del proyecto

**Proyecto:** `C:\Users\juanc\OneDrive\Escritorio\Proyectos\anden`
**Deploy:** Vercel · **BD:** Neon PostgreSQL
**Destinos activos:** Puerto Madryn, La Plata
**Docs:** `/docs/ANDEN.md`, `/docs/HANDOFF.md`, `/docs/CONTRIBUTING.md`, `/docs/BRAND.md`, `/docs/adr/`

---

**Última actualización:** 2026-05-28 — Identidad v2.0 + reconciliación de decisiones
