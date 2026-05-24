# Cómo contribuir a Andén

> Convenciones de trabajo para mantener el proyecto limpio, consistente y fácil de mantener entre Juan Cruz y Claude.

## Filosofía

Somos un equipo de dos. Las convenciones existen para que cuando volvamos al código en 3 meses, sepamos qué hicimos y por qué. No para burocracia.

Tres principios:

1. **Código autodocumentado.** Si necesitás un comentario para explicar qué hace, refactorizalo. Si lo necesitás para explicar **por qué** hace algo no obvio, dejá el comentario.
2. **Mensajes de commit con contexto.** El qué se ve en el diff. El por qué va en el mensaje.
3. **Pull Requests con descripción.** Aunque sea trivial. Te vas a agradecer en 6 meses.

## Workflow de Git

### Branches

- `main` — código de producción. Protegido. Solo merge vía PR.
- `develop` — opcional, si la velocidad lo justifica. Por ahora trabajamos directo con feature branches a `main`.
- `feat/nombre-corto` — features nuevas.
- `fix/nombre-corto` — bug fixes.
- `refactor/nombre-corto` — refactors sin cambio de comportamiento.
- `docs/nombre-corto` — solo documentación.
- `chore/nombre-corto` — tareas de mantenimiento.

### Commits

Usamos **Conventional Commits**. Formato:

```
<tipo>(<scope opcional>): <descripción imperativa>

<body opcional, explicando el por qué>

<footer opcional, refs a issues>
```

**Tipos válidos:**

| Tipo | Cuándo usarlo |
|------|---------------|
| `feat` | Feature nueva visible para el usuario |
| `fix` | Bug fix |
| `refactor` | Cambio interno sin afectar comportamiento |
| `perf` | Mejora de performance |
| `style` | Formato, espacios, sin cambio de lógica |
| `docs` | Solo documentación |
| `test` | Agregar o ajustar tests |
| `chore` | Tareas de build, dependencias, configs |
| `ci` | Cambios en CI/CD |

**Ejemplos buenos:**

```
feat(activities): agregar filtro por categoría en feed público

Los usuarios necesitaban filtrar las actividades por tipo
(naturaleza, cultura, etc.) sin recargar la página. Se
implementó client-side con searchParams para mantener URLs
compartibles.
```

```
fix(auth): redirect a /ingresar al expirar sesión

Antes la sesión expirada mostraba pantalla en blanco. Ahora
detecta 401 en server actions y fuerza redirect.
```

**Ejemplos malos:**

```
fix: arreglos    ❌ (¿qué arreglos?)
update           ❌ (¿qué actualizó?)
WIP              ❌ (no commitees WIP a main)
```

### Pull Requests

Aunque seamos dos, siempre PR. Razón: nos obliga a revisar el código antes de mergear, y deja historial searchable.

**Template de PR:**

```markdown
## ¿Qué hace?
Descripción corta del cambio.

## ¿Por qué?
Contexto: qué problema resuelve o qué decisión está detrás.

## ¿Cómo probarlo?
Pasos para verificar que funciona.

## Checklist
- [ ] Pasa typecheck (`pnpm typecheck`)
- [ ] Pasa lint (`pnpm lint`)
- [ ] Actualicé docs si era necesario
- [ ] Agregué ADR si es una decisión arquitectónica
```

## Estándares de código

### TypeScript

- **Strict mode siempre.** El `tsconfig.json` ya lo tiene activado.
- **Sin `any`.** Si no hay alternativa, comentar el por qué con `// eslint-disable-next-line @typescript-eslint/no-explicit-any`.
- **Tipos exportables** desde donde se definen, no en archivos `types.ts` genéricos.
- **Inferencia donde sea natural**, anotaciones explícitas en interfaces públicas.

### React / Next.js

- **Server Components por defecto.** Solo agregar `'use client'` cuando hay event handlers, hooks, browser APIs.
- **Composición sobre props gigantes.** Mejor `<Card><Card.Image /><Card.Body /></Card>` que `<Card image={...} body={...} />`.
- **Suspense + streaming** para datos lentos. No mostrar spinners full-page si parte del contenido ya está listo.

### Estilos

- **Solo Tailwind utility classes.** No escribir CSS en archivos `.module.css` salvo casos especiales (animaciones complejas).
- **Tokens del sistema, no hex hardcodeados.** Usar `var(--color-accent)` o `bg-[var(--color-accent)]`, no `#00D9C0`.
- **`cn()` helper** para className condicional. Nunca template strings con clases.

### Carpetas y archivos

- **Componentes:** PascalCase (`Button.tsx`, `ActivityCard.tsx`).
- **Hooks:** camelCase con prefijo `use` (`useFilters.ts`).
- **Utils/services:** kebab-case (`format-date.ts`).
- **Constantes:** SCREAMING_SNAKE_CASE en archivos PascalCase o camelCase.

## Architecture Decision Records (ADR)

Cualquier decisión técnica relevante se documenta en `/docs/adr/`. Una decisión es relevante cuando:

- Cambia el stack o agrega una dependencia importante.
- Define un patrón que el equipo va a seguir.
- Tiene trade-offs no obvios.

**Template:** copiar `docs/adr/000-template.md` y renombrar con número siguiente.

## Convenciones de UI/UX

- **Mobile-first siempre.** Diseñamos para celular y escalamos a desktop.
- **Accesibilidad nivel AA mínimo.** Contraste, labels, focus visible, navegación con teclado.
- **`prefers-reduced-motion` respetado** en toda animación.
- **Textos en español rioplatense neutro.** Voseo natural ("encontrá"), sin folclore.
- **Cero emojis en UI principal** (sí en contenido editorial controlado).

## Antes de pushear

```bash
pnpm lint
pnpm typecheck
pnpm format
```

Si todo pasa, podés pushear.

## Setup de hooks de Git (recomendado)

Próximamente: husky + lint-staged para correr esto automáticamente. Por ahora confiamos en disciplina.

---

Dudas, ideas, propuestas de cambios a estas reglas: abrir un issue o discutir directo.
