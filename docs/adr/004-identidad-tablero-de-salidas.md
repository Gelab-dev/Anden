# ADR 004 — Identidad visual: "el tablero de salidas"

> Ajustá el número al siguiente disponible en `/docs/adr/` antes de commitear.

**Estado:** aceptada
**Fecha:** 2026-05-28
**Decisores:** Juan Cruz Gelabert, Claude

---

## Contexto

El proyecto arrastraba una identidad visual sin decidir. `ANDEN.md` (v1.4, §9)
definía **Inter + turquesa eléctrico sobre azul marino** (lenguaje tech/frío). Lo
construido en código usaba **Playfair Display + DM Sans sobre crema/sand**
(lenguaje editorial/cálido). Son personalidades casi opuestas, y los adjetivos de
marca encajaban en las dos, así que la identidad verbal no desambiguaba.

Además no existía logo ni wordmark, y el turquesa-sobre-navy es el cliché visual
más usado por startups tech/fintech, con baja apropiabilidad.

## Decisión

Adoptamos una identidad anclada en el significado del nombre: **Andén = el tablero
de salidas de cada ciudad**. El sistema de estados en tiempo real del producto *es*
un tablero de salidas, así que marca y producto comparten un mismo concepto.

Concretamente:

- **Acento:** ámbar señal `#FF9F1C` (la luz del tablero). Se elimina el turquesa.
- **Oscuros:** negro tablero cálido `#17140F` (no azul marino).
- **Claros:** crema boleto `#F4ECDC` (se conserva la calidez del build actual).
- **Estados:** verde/amarillo/rojo/gris — la paleta de estado del producto y la de
  marca son la misma.
- **Tipografía:** Bricolage Grotesque (display, reemplaza Playfair) + DM Sans
  (UI/cuerpo, se conserva) + DM Mono (datos: horas, cupos, estados).
- **Logo:** isotipo de solapa de tablero con chevron ámbar; wordmark "Andén" con
  punto-señal ámbar. Ver `BRAND.md` y `anden-isotipo.svg`.

Detalle completo en `BRAND.md` (reemplaza §8–10 de `ANDEN.md`).

## Trade-offs / consecuencias

**A favor:**
- Resuelve la contradicción doc-vs-código con un solo concepto, en vez de elegir
  entre dos direcciones tibias.
- Alta apropiabilidad: nadie en travel-tech usa ámbar-sobre-negro-cálido.
- Coherencia marca↔producto: el feed *es* el tablero; la voz ya hablaba así.
- Migración barata desde el build actual: se conserva DM Sans y crema; solo se
  cambia Playfair→Bricolage, el acento turquoise→ámbar y se agrega DM Mono.

**En contra / costos:**
- Hay que migrar tokens en `globals.css` y revisar todos los usos de turquoise.
- Riesgo de que el ámbar lea "naranja barato" si se usa sin disciplina: se mitiga
  con mucho negro/crema alrededor y restringiendo el ámbar a acento (ver `BRAND.md`).
- Conflicto potencial ámbar-marca vs amarillo-"Demorado": se mitiga diferenciando
  el hue (ámbar-naranja vs amarillo) y obligando etiqueta de texto en cada estado.

**Reversible:** sí, a bajo costo, mientras la base de assets sea chica. Por eso se
decide ahora ("estamos a tiempo").
