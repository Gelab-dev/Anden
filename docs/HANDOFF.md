# HANDOFF — Estado de Andén (Mayo 2026)

**Fecha:** 2026-05-24  
**Para:** Próximo chat con Claude  
**Estado:** MVP v1.0 completo — listo para primer deploy

---

## Estado general

El MVP de Andén está completo y funcionando. Esta sesión cubrió:
- Rediseño visual completo de la landing `/comercial`
- Reestructuración del proyecto con Route Groups
- Dashboard del prestador completo
- Feed público completo
- Primer deploy en Vercel (en curso)

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx                    ← root: html + body + globals.css + SessionProvider
│   ├── globals.css                   ← tokens de marca (Tailwind v4 @theme)
│   ├── not-found.tsx                 ← página 404 global
│   ├── (public)/                     ← feed viajero: navbar oscura + footer
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← home: hero + destinos + actividades destacadas
│   │   └── [destinoSlug]/
│   │       ├── page.tsx              ← feed del destino
│   │       ├── activity-card.tsx     ← card de actividad con WhatsApp
│   │       ├── destino-pill.tsx      ← pill de destino (client)
│   │       └── [actividadSlug]/
│   │           ├── page.tsx          ← detalle de actividad
│   │           └── whatsapp-button.tsx
│   ├── (comercial)/                  ← landing prestadores: navbar crema + fondo crema
│   │   └── comercial/
│   │       ├── layout.tsx            ← NavbarComercial + Playfair + DM Sans + fondo crema
│   │       ├── page.tsx
│   │       ├── mapa-3d.tsx           ← mapa SVG de Argentina con parallax framer-motion
│   │       ├── components/
│   │       │   ├── navbar-comercial.tsx
│   │       │   ├── hero-section.tsx
│   │       │   ├── problema-section.tsx
│   │       │   ├── solucion-section.tsx
│   │       │   ├── como-funciona-section.tsx
│   │       │   ├── roadmap-section.tsx
│   │       │   └── sticky-bar.tsx
│   │       └── data/
│   │           ├── landing.data.ts
│   │           └── argentina-destinations.ts
│   ├── (auth)/                       ← login/registro: layout mínimo oscuro
│   │   ├── layout.tsx                ← Playfair + DM Sans
│   │   └── login/
│   │       └── page.tsx              ← login + registro en un form, ?modo=registro
│   ├── (dashboard)/                  ← panel prestador: navbar propia + oscuro cálido
│   │   ├── layout.tsx                ← NavbarDashboard + Playfair + DM Sans + surface tokens
│   │   └── dashboard/
│   │       ├── page.tsx              ← panel principal: stats + lista actividades
│   │       ├── crear-perfil/
│   │       │   └── page.tsx          ← onboarding del prestador
│   │       ├── nueva-actividad/
│   │       │   └── page.tsx          ← formulario nueva actividad (eventual/recurrente)
│   │       └── editar-actividad/
│   │           └── [actividadId]/
│   │               └── page.tsx      ← formulario edición de actividad
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── register/                 ← POST: crear cuenta usuario
│       ├── provider/create/          ← POST: crear perfil prestador + asigna rol PROVIDER_OWNER
│       ├── activity/
│       │   ├── create/               ← POST: crear actividad
│       │   ├── update/               ← PATCH: editar actividad
│       │   ├── update-status/        ← PATCH: cambiar estado en tiempo real
│       │   └── [actividadId]/        ← GET: obtener actividad por ID
│       └── proxy.ts                  ← protege /dashboard sin sesión (Next.js 16)
├── components/
│   ├── navbar.tsx                    ← navbar feed viajero (oscura, con buscador visual)
│   ├── navbar-dashboard.tsx          ← navbar dashboard (oscura cálida)
│   ├── activity-status-selector.tsx  ← selector de estado con modal portal
│   ├── footer.tsx
│   ├── session-provider.tsx
│   └── ui/
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       └── input.tsx
└── lib/
    ├── auth.ts
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
| ORM | Prisma | 7.x |
| DB | PostgreSQL / Neon | PG 17 |
| Auth | NextAuth v5 | 5.x |
| Animaciones | Framer Motion | 12.x |
| Fuentes | Playfair Display + DM Sans | Google Fonts |
| Hosting | Vercel | — |

---

## Convenciones confirmadas

**Archivos y carpetas:** `kebab-case` sin guiones bajos  
**Componentes exportados:** `PascalCase` dentro del archivo  
**Route Groups:** `(public)`, `(comercial)`, `(auth)`, `(dashboard)`  
**Proxy (Next.js 16):** `src/proxy.ts` — no `middleware.ts`  

**Tailwind v4:**
- `shrink-0` no `flex-shrink-0`
- `bg-linear-to-b` no `bg-gradient-to-b`
- Sin `tailwind.config.js` — tokens en `@theme {}` en `globals.css`
- `cursor-pointer` en todos los botones e interactivos

**Framer Motion:**
- `ease` se castea como `MotionTransition['ease']`
- `whileInView` para animaciones al hacer scroll
- `createPortal` para modales que necesitan salir del DOM

---

## Paleta de colores

### Modo oscuro (feed + dashboard)
```css
--color-dark-900: #0d1b2a    /* fondo principal */
--color-dark-800: #1b263b
--color-dark-700: #2d3e50
--color-dark-600: #415a77
--color-turquoise: #00d9c0   /* acento principal */
--color-surface: #1A1A1A     /* dashboard fondo */
--color-surface-2: #222220
--color-surface-3: #2A2A27
--color-surface-border: rgba(255,255,255,0.07)
```

### Modo claro (landing /comercial)
```css
--color-cream: #F5F0E8       /* fondo principal */
--color-cream-dark: #EDE7D9  /* secciones alternadas */
--color-ink: #1A1A1A         /* texto principal */
--color-ink-light: #6B6560   /* texto secundario */
--color-sand: #C4956A        /* acento cálido */
--color-turquoise-muted: #00A896
```

---

## Decisiones de diseño

**Landing /comercial:** paleta crema cálida — editorial, no tech. Playfair Display para headlines, DM Sans para cuerpo. Acento sand para CTAs y verbo rotante. Turquoise muted solo para indicadores de estado en vivo.

**Dashboard:** oscuro cálido (`#1A1A1A`) — mismo mundo visual que la landing pero nocturno. Sand como acento, mismas tipografías. No el azul marino del design system original.

**Feed público:** oscuro original (`dark-900`) con turquoise. Es el producto, no marketing.

**Continuidad de marca:** las tres experiencias usan Playfair + DM Sans + acento sand como hilo conductor. El usuario no siente que cambió de app.

---

## Flujos de usuario completos

### Flujo prestador
1. `/comercial` — landing de captación
2. `/login?modo=registro` — crear cuenta (nombre negocio + email + password)
3. `/dashboard/crear-perfil` — completar perfil (whatsapp + bio + destino)
4. `/dashboard` — panel: ver actividades, cambiar estado, editar
5. `/dashboard/nueva-actividad` — publicar actividad (eventual o recurrente)
6. `/dashboard/editar-actividad/[id]` — editar actividad existente

### Flujo viajero/local
1. `/` — home: destinos activos + actividades destacadas
2. `/[destinoSlug]` — feed del destino: actividades por estado
3. `/[destinoSlug]/[actividadSlug]` — detalle + botón WhatsApp

---

## Lógica de negocio clave

**Tipos de actividad:** `eventual` (tiene fecha inicio/fin) o `recurrente` (esquema de horarios fijo). Campo `isRecurring` en BD.

**Estados de actividad:** `OPERATING`, `LIMITED`, `SOLD_OUT`, `CLOSED`, `SCHEDULED`. El prestador los cambia desde el dashboard con modal. API: `PATCH /api/activity/update-status`.

**Verificación de prestadores:** los prestadores arrancan en `PENDING`. Solo aparecen en el feed público si están en `VERIFIED`. Para verificar manualmente: Prisma Studio → tabla Provider → cambiar `status`.

**Roles de usuario:** `TRAVELER` (default), `PROVIDER_OWNER` (se asigna al crear perfil), `ADMIN`. Al crear un provider se actualiza el rol en la misma transacción.

**WhatsApp:** el botón de contacto abre `wa.me/{numero}?text={mensaje}`. No hay intermediación — contacto directo. Tracking de clicks pendiente (post-MVP).

**El feed no toca plata:** Andén no procesa pagos ni comisiones en el MVP.

---

## Próximos pasos post-MVP

1. Tracking real de clicks en WhatsApp (redirect propio)
2. Buscador conectado a API (por destino, categoría, título)
3. Editar perfil del prestador
4. Recordatorio automático por WhatsApp la noche anterior (Twilio)
5. Reseñas verificadas
6. Segundo destino piloto activo (La Plata)
7. Andén Pro — métricas avanzadas, posicionamiento destacado
8. SEO: sitemap, schema.org, Open Graph dinámico

---

## Contexto del proyecto

**Proyecto:** `C:\Users\juanc\OneDrive\Escritorio\Proyectos\anden`  
**Repositorio:** recién creado (primer commit en esta sesión)  
**Deploy:** Vercel (en curso)  
**BD:** Neon PostgreSQL  
**Destinos activos:** Puerto Madryn, La Plata  
**Docs:** `/docs/ANDEN.md`, `/docs/HANDOFF.md`, `/docs/CONTRIBUTING.md`

---

**Última actualización:** 2026-05-24 — MVP v1.0 completo
