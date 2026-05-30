# Andén — Identidad de marca

> El tablero de salidas de cada ciudad.

**Versión:** v2.0 — Identidad "tablero de salidas"
**Reemplaza:** secciones 8, 9 y 10 de `ANDEN.md` (v1.4)
**Última actualización:** 2026-05-28

---

## 1. La línea

**Andén es el tablero de salidas de cada ciudad.**

Todo en la marca cae de acá. Un tablero de salidas es información que cambia en vivo
y en la que se puede confiar *ahora* — exactamente la promesa del producto. Y es,
además, un objeto cálido y argentino: patrimonio ferroviario, sin folclore.

El sistema de estados de Andén (Activo / Demorado / Cupo completo / Cancelado /
Suspendido) **es** un tablero de salidas. La metáfora no decora: organiza el color,
la tipografía, la voz y el logo.

Esta línea unifica las dos direcciones que el proyecto venía mezclando:
- el impulso "tiempo real / dato vivo" (antes resuelto con turquesa)
- el impulso "editorial / cálido" (antes resuelto con crema + Playfair)

El tablero de estación es las dos cosas a la vez. No hay que elegir.

---

## 2. El nombre

**Andén** — /an-dén/, énfasis en la "e".

El punto de encuentro y de partida. Donde la espera se vuelve movimiento.
- **Encuentro** — viajeros y prestadores, personas y lugares.
- **Movimiento** — el comienzo de un trayecto.
- **Argentinidad** — herencia ferroviaria, parte de la historia del país.
- **Conexión** — los andenes unen lugares y momentos.

Bonus fonético: "Andén" remite a "Andes", anclando la marca al territorio
argentino sin volverla regionalista.

### Escritura

- Siempre **Andén**, con tilde y mayúscula inicial. Nunca ANDEN, nunca anden.
- Es nombre propio: en texto corrido va con mayúscula (`Abrí Andén`, `en Andén`).
- En el logo el wordmark es **Andén** en minúsculas salvo la inicial — no en
  caja alta. El carácter de marca viene de la tipografía y del isotipo, no de
  gritar el nombre.

---

## 3. Taglines

**Tagline principal (institucional / prestador):**
> La vida real de cada destino argentino.

**Línea de marca (la columna vertebral, uso editorial e interno):**
> El tablero de salidas de cada ciudad.

**Promesa emocional (usuario / viajero / local):**
> Viví la ciudad como la vive su gente.

Regla: una sola por pieza. No apilar taglines.

---

## 4. Personalidad

- **Moderna sin pretenciosa.** Contemporánea con identidad propia, no copia de
  Silicon Valley.
- **Directa sin fría.** Habla claro, en argentino, sin tecnicismos.
- **Confiable sin corporativa.** Inspira seguridad, no es solemne ni acartonada.
- **Energética sin frenética.** Tiene impulso, pero respeta el ritmo del usuario.
- **Argentina sin folclorismo.** Local, de pretensión universal.

El tablero de estación encarna las cinco: es funcional y confiable (te dice la
verdad de lo que pasa ahora), cálido y humano (luz incandescente, papel, hierro),
y nada pretencioso.

---

## 5. Sistema visual

### 5.1 Los tres mundos, un solo idioma

Andén tiene tres superficies. Antes parecían tres apps; ahora son tres vistas del
mismo tablero. El hilo conductor es: **negro tablero + ámbar señal + crema boleto +
las mismas tres tipografías**.

| Superficie | Fondo base | Carácter | Metáfora |
|------------|-----------|----------|----------|
| Feed público (`/[destino]`) | `board` (#17140F) | El tablero encendido, de noche | El cartel de salidas de la estación |
| Dashboard prestador | `board` (#17140F) | Mismo tablero, lado operador | La cabina que controla el tablero |
| Landing comercial (`/comercial`) | `cream` (#F4ECDC) | El boleto / horario impreso | El papel antes de subir al tren |

El acento ámbar y las tipografías son idénticos en las tres. El usuario nunca
siente que cambió de app.

### 5.2 Paleta

#### El tablero — oscuros (feed + dashboard)

| Token | Hex | Uso |
|-------|-----|-----|
| `board` | `#17140F` | Fondo principal. El tablero. Negro cálido, no azul tech. |
| `board-2` | `#211C16` | Surface elevada, cards, navbar |
| `board-3` | `#2C261D` | Surface 2, inputs, hover de filas |
| `board-line` | `rgba(244,236,220,0.08)` | Bordes hairline sobre oscuro |

#### El boleto — claros (landing)

| Token | Hex | Uso |
|-------|-----|-----|
| `cream` | `#F4ECDC` | Fondo principal de la landing. Papel cálido. |
| `cream-2` | `#EAE0CC` | Secciones alternadas |
| `ink` | `#1E1A14` | Texto principal sobre crema |
| `ink-soft` | `#6E6353` | Texto secundario sobre crema |

#### La señal — acento (las tres superficies)

| Token | Hex | Uso |
|-------|-----|-----|
| `signal` | `#FF9F1C` | Acento primario. CTAs, links, "en vivo". La luz del tablero. |
| `signal-bright` | `#FFC152` | Hover y foco |
| `signal-deep` | `#B86A0A` | Texto-acento sobre crema y estados pressed (contraste AA) |

> El ámbar es para **fondo de CTA, íconos, indicadores y gráfica**, no para texto
> de cuerpo sobre crema. Para texto usar `ink` / `signal-deep`.

#### Las señales del tablero — estados

Los estados del producto **son** la paleta de estado. Verde/amarillo/rojo/gris,
el idioma universal del semáforo y del cartel de salidas.

| Estado de actividad | Token | Hex | Señal |
|---------------------|-------|-----|-------|
| Activo | `activo` | `#1FA866` | Verde |
| Demorado | `demorado` | `#F2C94C` | Amarillo + nueva hora |
| Cupo completo / Cancelado | `completo` | `#E5484D` | Rojo + motivo |
| Suspendido | `suspendido` | `#8A8378` | Gris cálido + fecha |

> **Regla de accesibilidad (AA):** el color nunca es la única señal. Cada estado
> lleva siempre una etiqueta de texto y/o un ícono. Esto cumple el estándar AA que
> exige `CONTRIBUTING.md` y evita que el ámbar de marca se confunda con el amarillo
> de "Demorado".

### 5.3 Tipografía

Tres familias, un rol cada una. Todas en Google Fonts.

| Rol | Familia | Por qué |
|-----|---------|---------|
| Display / títulos | **Bricolage Grotesque** (500/700/800) | Carácter y calidez, condensada, contemporánea sin ser genérica. Reemplaza a Playfair. |
| UI / cuerpo | **DM Sans** (400/500) | Ya estaba en el código. Limpia, excelente para producto. No se migra. |
| Datos / tablero | **DM Mono** (400/500) | Horarios, cupos, estados, contadores. El gancho conceptual: hace que cada dato se lea como un cartel real. |

**Escala de pesos:** 400 (cuerpo) → 500 (UI media) → 700 (subtítulos/botones) → 800 (heroes).

**Letter-spacing:** negativo en títulos grandes (−0.6 a −1.5px), neutro en cuerpo,
tabular en mono (los números alinean en columna como en un tablero real).

**Regla del mono:** todo lo que es un dato verificable (hora, cupo, estado, fecha,
distancia, contador) va en DM Mono. Todo lo que es prosa va en DM Sans. Esa
distinción tipográfica es marca.

### 5.4 Logo

**Isotipo:** una solapa de tablero (rounded square con costura horizontal al medio)
con un **chevron ámbar hacia arriba** que lee a la vez como próxima salida, como
movimiento y como la "A" de Andén, sobre la línea del borde del andén. Archivo:
`anden-isotipo.svg`.

**Wordmark:** "Andén" en Bricolage Grotesque 800, con un punto ámbar `signal` como
luz "en vivo" al final.

**Usos:**
- Lockup completo (isotipo + wordmark) para navbar, landing, material impreso.
- Isotipo solo para favicon, app icon, avatar de redes, QR.
- Sobre oscuro: wordmark en `cream`, punto en `signal`.
- Sobre crema: wordmark en `ink`, punto en `signal`.

**No hacer:** estirar, rotar, ponerle sombra/glow, cambiarle el color al chevron,
escribir el wordmark en caja alta, encerrar el isotipo en otro recuadro.

### 5.5 Motivos gráficos

- **El borde del andén:** la línea de seguridad ámbar del borde del andén. Banda
  horizontal ámbar como separador o pie de sección. Ownable e inconfundible.
- **La solapa / split-flap:** transiciones de estado que "giran" (sutil, respetando
  `prefers-reduced-motion`). Tarjetas con costura horizontal.
- **La grilla del tablero:** filas tipo cartel de salidas — hora (mono) · nombre ·
  estado (color + label). Es la unidad base del feed.

### 5.6 Animación

- Interacciones (300–400ms): `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Entradas (500–1200ms): `cubic-bezier(0.16, 1, 0.3, 1)`
- Cambio de estado: micro "flip" de solapa, ≤300ms.
- Ambient/loop (2–8s): `ease-in-out`.
- **Todo se desactiva con `prefers-reduced-motion: reduce`** (obligatorio, AA).
- Sin glow ni neón. El ámbar es plano. La calidez viene del color, no de efectos.

### 5.7 Glassmorphism

Solo en elementos flotantes (navbar, modales, cards sobre hero). Nunca en
superficies grandes. Usar con extrema moderación: el tablero es plano y honesto.

---

## 6. Tono y voz

### Principio: escribí como un tablero de salidas

Presente, preciso, estado primero, hora exacta, cero relleno. El tablero no te
vende el viaje: te dice qué sale, a qué hora y en qué estado. Esa es la voz.

- **Directo, no brusco.** Claro, con cuidado del usuario.
- **Argentino, no folclórico.** Voseo natural ("encontrá", "registrate"). Sin
  "viví la magia".
- **Informativo, no aspiracional.** Describimos hechos, no vendemos sueños.
- **Conciso, no telegráfico.** Cortamos lo innecesario sin perder calidez.
- **Cero relleno corporativo.** Nada de "soluciones innovadoras" ni "ecosistemas".

### Ejemplos

| Contexto | Bien | Mal |
|----------|------|-----|
| Hero | "Qué hacés hoy en Madryn." | "Descubrí experiencias inolvidables." |
| CTA | "Ver qué sale hoy" | "Comenzá tu próxima aventura" |
| Estado | "Avistaje cancelado por viento. Te avisamos cuando se reprograme." | "Lamentablemente la experiencia no estará disponible." |
| Frescura | "Confirmado hace 2 h" | "Información posiblemente actualizada" |
| Prestador | "Publicá tu actividad en menos de 2 minutos." | "Únete a nuestra revolución turística." |
| Sin resultados | "No hay nada confirmado para hoy. Mirá mañana o cambiá de destino." | "Ups, no encontramos nada." |

### Segmentación por audiencia

Misma identidad visual, tono ajustado al contexto:

| Dimensión | Viajero / Local | Prestador |
|-----------|-----------------|-----------|
| Tono | Emocional, descubrimiento | Racional, ROI, confianza |
| Promesa | "Encontrá algo para hacer hoy" | "Llegá al cliente en el momento exacto" |
| Canal | Feed, redes, QR físico | LinkedIn, gremios, referidos |
| UX | Exploración rápida, visual | Onboarding guiado, panel claro |

### Evitamos siempre

- Emojis decorativos en UI principal.
- Signos de exclamación múltiples.
- Inglés cuando hay español natural ("pricing" → "precios").
- Tecnicismos turísticos ("oferta hotelera", "demanda agregada").
- Color de estado sin etiqueta de texto.

---

## 7. Checklist de marca

Antes de publicar cualquier pieza:

- [ ] ¿El acento es ámbar `signal`, no turquesa?
- [ ] ¿Los datos (hora, cupo, estado) están en DM Mono?
- [ ] ¿Los títulos en Bricolage, el cuerpo en DM Sans?
- [ ] ¿Cada estado tiene etiqueta de texto además del color?
- [ ] ¿El wordmark está bien escrito (Andén, no ANDEN)?
- [ ] ¿La voz suena a tablero — presente, preciso, sin relleno?
- [ ] ¿Las animaciones se desactivan con `prefers-reduced-motion`?
