# Andén

> La vida real de cada destino argentino.

Andén es una plataforma digital que centraliza la oferta turística y cultural de cada destino argentino en un feed vivo, actualizado en tiempo real por quienes organizan las actividades.

---

## ¿Qué es?

Para el **viajero y el local** — un solo lugar para descubrir qué está pasando hoy en un destino, con información confiable y actualizada. Sin registrarse, sin algoritmos.

Para el **prestador** — visibilidad gratuita, leads directos por WhatsApp y herramientas de gestión que crecen con el negocio. Publicá excursiones, eventos, talleres, ferias, clases o cualquier actividad con horario.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 + TypeScript 5.8 |
| Estilos | Tailwind CSS v4 (CSS-first) |
| ORM | Prisma 7 |
| Base de datos | PostgreSQL (Neon) |
| Auth | NextAuth v5 |
| Animaciones | Framer Motion 12 |
| Fuentes | Playfair Display + DM Sans |
| Deploy | Vercel |
| Package manager | pnpm |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (public)/           → feed viajero (home + destinos + actividades)
│   ├── (comercial)/        → landing para prestadores
│   ├── (auth)/             → login y registro
│   ├── (dashboard)/        → panel del prestador
│   └── api/                → endpoints REST
├── components/             → UI compartido
└── lib/                    → auth, prisma, utils
```

---

## Setup local

**Requisitos:** Node.js 20+, pnpm, cuenta en Neon (PostgreSQL)

```bash
# Clonar e instalar
git clone https://github.com/tu-usuario/anden.git
cd anden
pnpm install

# Variables de entorno
cp .env.example .env.local
# Completar: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Base de datos
pnpm prisma migrate dev
pnpm prisma db seed

# Desarrollo
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

---

## Flujos principales

### Prestador
1. `/comercial` — landing de captación
2. `/login?modo=registro` — crear cuenta
3. `/dashboard/crear-perfil` — completar perfil
4. `/dashboard` — panel: actividades, estados, métricas
5. `/dashboard/nueva-actividad` — publicar actividad

### Viajero / Local
1. `/` — home con destinos activos
2. `/[destino]` — feed de actividades en tiempo real
3. `/[destino]/[actividad]` — detalle + contacto por WhatsApp

---

## Comandos útiles

```bash
pnpm dev              # servidor de desarrollo
pnpm build            # build de producción
pnpm lint             # ESLint
pnpm typecheck        # TypeScript
pnpm prisma studio    # explorador de base de datos
pnpm prisma migrate dev   # nueva migración
```

---

## Destinos piloto

- **Puerto Madryn** — validación turística estacional (Patagonia, ballenas)
- **La Plata** — validación cultural urbana (teatro, eventos, talleres)

---

## Roadmap

| Fase | Estado |
|------|--------|
| MVP — feed público + dashboard prestador | ✅ Completo |
| Buscador por destino, categoría y actividad | 🔧 En desarrollo |
| Recordatorio automático por WhatsApp | 📋 Planificado |
| Andén Pro — métricas avanzadas | 📋 Planificado |
| Andén IA — agente de WhatsApp (powered by Gelab) | 🔮 Futuro |

---

## Contribuir

Ver [CONTRIBUTING.md](docs/CONTRIBUTING.md) para convenciones de código, commits y pull requests.

---

## Documentación

- [ANDEN.md](docs/ANDEN.md) — visión, producto, marca y arquitectura
- [HANDOFF.md](docs/HANDOFF.md) — estado actual del proyecto
- [CONTRIBUTING.md](docs/CONTRIBUTING.md) — guía de trabajo en equipo

---

**Andén** · La vida real de cada destino argentino  
Desarrollado con ♥ en Argentina · 2026
