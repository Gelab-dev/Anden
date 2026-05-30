# Andén

> La vida real de cada destino argentino.

**Versión:** v2.0 — Identidad "tablero de salidas" + reconciliación MVP
**Última actualización:** 2026-05-28

---

## Tabla de contenidos

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Misión, visión y valores](#2-misión-visión-y-valores)
3. [Problema y oportunidad](#3-problema-y-oportunidad)
4. [Propuesta de valor](#4-propuesta-de-valor)
5. [Producto](#5-producto)
6. [Audiencias y usuarios](#6-audiencias-y-usuarios)
7. [Modelo de negocio](#7-modelo-de-negocio)
8. [Identidad de marca](#8-identidad-de-marca)
9. [Sistema visual](#9-sistema-visual)
10. [Tono y voz](#10-tono-y-voz)
11. [Stack tecnológico](#11-stack-tecnológico)
12. [Arquitectura de información](#12-arquitectura-de-información)
13. [Roadmap](#13-roadmap)
14. [Métricas de éxito](#14-métricas-de-éxito)
15. [Equipo y roles](#15-equipo-y-roles)

> **Nota:** el detalle completo de identidad de marca (logo, paleta exacta,
> tipografía, voz, checklist) vive en `docs/BRAND.md`, que es la fuente canónica
> para diseño. Las secciones 8–10 acá son el resumen estratégico.

---

## 1. Resumen ejecutivo

**Andén** es una plataforma digital que centraliza la oferta turística y cultural de cada destino argentino en un feed vivo, actualizado en tiempo real por quienes organizan las actividades. Es el **tablero de salidas de cada ciudad**: te dice qué pasa hoy, a qué hora y en qué estado.

Para el viajero es la única herramienta que muestra qué está pasando hoy en un destino, con información confiable y actualizada. Para el local es la forma más rápida de enterarse qué sucede en su propia ciudad sin depender de diez perfiles de Instagram. Para el prestador es visibilidad gratuita, leads directos por WhatsApp y herramientas de gestión que crecen con su negocio.

Andén no es una guía turística. No es una agenda de eventos. No es un directorio de negocios. Es **la vida real de una ciudad, en tiempo real.**

**Destinos piloto:** Puerto Madryn (validación turística estacional) y La Plata (validación cultural urbana).

**Modelo:** gratuito para viajeros y prestadores en el MVP. La monetización entra en fases posteriores cuando el producto es sólido y la base de usuarios justifica el cobro.

---

## 2. Misión, visión y valores

### Misión

Conectar a las personas con lo que está pasando en cada destino argentino, en tiempo real, eliminando la fricción de la información dispersa y desactualizada.

### Visión

Que cuando alguien llegue a cualquier destino argentino — como viajero o como vecino — su primer reflejo sea abrir Andén para saber qué hacer hoy.

### Valores

**Tiempo real ante todo.** La información desactualizada es peor que no tener información. Cada dato que mostramos debe ser confiable hoy.

**El usuario primero, siempre.** Toda decisión de producto se evalúa por el impacto en quien consume el contenido. Los prestadores son aliados estratégicos, no clientes a explotar.

**Gratis cuando importa, justo cuando se cobra.** El acceso al contenido siempre será gratuito. Cuando cobremos, será por valor agregado real y medible.

**Construido en Argentina.** Pensamos en pesos, en WhatsApp, en cómo funciona realmente el turismo y la cultura en este país. No copiamos modelos globales sin adaptarlos.

**Cultura local sin filtros.** No curamos el contenido para que parezca turístico. Mostramos lo que realmente pasa en cada ciudad — eso es exactamente lo que tanto el viajero como el local necesitan.

**Diseño que respeta al usuario.** Sin dark patterns, sin pop-ups invasivos, sin recolección de datos innecesaria. Performance, accesibilidad y claridad como principios no negociables.

---

## 3. Problema y oportunidad

### El problema

La información sobre actividades, eventos y experiencias en cada destino argentino está fragmentada en canales aislados:

- Redes sociales de prestadores individuales (historias que desaparecen en 24 horas)
- PDFs y webs municipales desactualizados
- Grupos de WhatsApp informales a los que no pertenecés
- Sitios de agencias con información parcial y comisionada
- Boca a boca entre operadores

El resultado es doble:

**Para el viajero y el local:** pierden tiempo y dinero por información incorrecta. El evento fue cancelado pero no se enteraron. La excursión salía a las 9 pero el horario cambió. La feria gastronómica era esta noche y ni sabían que existía.

**Para el prestador:** tiene una oferta excelente pero ninguna forma escalable de mostrarla. Responde 50 WhatsApps por día con la misma información. Su web dice una cosa, su Instagram otra. El viajero que ya está en el destino, listo para reservar ahora mismo, no lo encuentra.

### La oportunidad

Argentina recibe entre 25 y 30 millones de turistas anuales. El sector turístico representa cerca del 7-8% del PBI nacional. Sin embargo, no existe una plataforma local que unifique la información en tiempo real, que sirva tanto para destinos turísticos clásicos como para ciudades con alta densidad cultural, y que sea útil tanto para el viajero como para el vecino.

Los competidores indirectos (Google Maps, TripAdvisor, Instagram, Eventbrite, agendas municipales) cubren fragmentos del problema pero ninguno resuelve el caso central: **¿qué puedo hacer hoy en este lugar?**

### El diferenciador central frente a Instagram

Instagram le da alcance al prestador. Andén le da el cliente en el momento exacto en que está listo para pagar.

Instagram captura atención de gente que no está buscando nada. El algoritmo muestra una excursión en Madryn a alguien en Buenos Aires un martes a las 11am. Esa persona no viaja este fin de semana.

Andén captura intención. Quien abre Andén en Madryn está en Madryn, o está a horas de llegar. Está con la billetera caliente. Ese es el momento que Instagram no puede capturar.

### Por qué ahora

- Penetración masiva de smartphones e internet móvil en Argentina.
- Generación joven con expectativas de UX nativa digital que ningún competidor cubre.
- Post-pandemia, el viajero exige información confiable antes de moverse.
- Madurez de herramientas que permiten construir productos escalables con equipos pequeños.

---

## 4. Propuesta de valor

### Para el viajero y el local

> "Sabé qué está pasando hoy en tu destino, sin tener que buscar en diez lugares."

- Un solo lugar para descubrir actividades, eventos, atractivos y experiencias.
- Información actualizada en tiempo real por quienes la conocen.
- Sin registro obligatorio para explorar.
- Sin intermediarios — contacto directo con quien ofrece.
- Tan útil para el turista que llega hoy como para el vecino que quiere saber qué pasa esta semana.

### Para el prestador

> "Llegá al viajero que ya está en tu destino y está listo para reservar. Gratis para empezar."

- Perfil profesional con galería, descripción, políticas y servicios.
- Publicación de actividades con estado en tiempo real.
- Gestión simple: dos clicks para actualizar si algo cambia.
- Leads directos por WhatsApp, sin comisiones ni intermediarios.
- Herramientas que crecen con el negocio — empezás gratis, escalás cuando tiene sentido.

### Para el ente público (futuro)

> "Conocé tu destino con datos reales y comunicate centralizadamente."

- Vista agregada de la actividad turística y cultural de su jurisdicción.
- Canal oficial de alertas y comunicados.
- Métricas de demanda y flujos turísticos.

---

## 5. Producto

### Qué es Andén

Una plataforma web responsive (mobile-first) accesible sin descargar nada. Tres superficies principales:

1. **Feed público del destino** — accesible sin registro, indexable por buscadores.
2. **Panel del prestador** — registro gratuito, gestión de perfil y publicaciones.
3. **Cuenta del viajero (opcional)** — para seguir prestadores, guardar favoritos, recibir alertas.

### Tipos de actividades

Andén maneja dos tipos de actividades con comportamientos distintos:

**Actividades eventuales**
Tienen fecha de inicio y fin definida. Ocurren una vez o en un período acotado. Una vez que pasa la fecha, la actividad se archiva automáticamente.
- Feria gastronómica (viernes y sábado de esta semana)
- Recital (sábado 21hs)
- Exposición temporal (del 1 al 30 de junio)
- Torneo abierto de pádel (este fin de semana)

**Actividades recurrentes**
Tienen un esquema de horarios fijo que se repite. El prestador las publica una vez y el sistema las mantiene activas según ese esquema. Solo interviene cuando algo cambia.
- Avistaje de ballenas (martes, jueves y sábados — 9:00 y 14:00)
- Clase de yoga en el parque (todos los domingos — 8:00)
- Tour de la ciudad (lunes a viernes — 10:00)
- Función de teatro (viernes y sábados — 21:00)

### Qué tipos de contenido publica

**Entra todo lo que tiene horario definido y requiere que alguien decida ir:**

- Excursiones y actividades de naturaleza (avistajes, trekkings, buceo, safaris fotográficos)
- Eventos culturales (recitales, teatro, ciclos de cine, exposiciones temporales)
- Atractivos turísticos con horarios y estado (museos, parques, miradores)
- Talleres y experiencias (clases de cocina, tours temáticos, clases de idiomas abiertas)
- Eventos gastronómicos (ferias, cenas temáticas, degustaciones, festivales)
- Ferias, mercados, eventos comunitarios
- Actividades deportivas abiertas al público (torneos, clases grupales, salidas)
- Experiencias culturales locales (milongas, peñas, clases de danza)

La regla es simple: **si tiene horario y requiere que alguien decida ir, entra en Andén.** El turismo es todo lo que se hace durante el tiempo libre — no existe distinción entre "turístico" y "local". Una clase de jiu-jitsu al aire libre un sábado puede serle tan útil a un vecino como a un viajero que quiere aprovechar su mañana.

**No entra:**
- Restaurantes operando con su servicio habitual (no tienen actividad diferenciada con fecha)
- Hospedaje permanente
- Comercios sin propuesta de evento o experiencia
- Cualquier oferta sin horario o sin estado verificable

### Sistema de estados en tiempo real

Este es el núcleo del producto. La promesa de Andén es que la información es confiable hoy. Para cumplirla, cada actividad tiene un estado visible que el prestador actualiza desde el panel:

| Estado | Descripción | Señal visual |
|--------|-------------|--------------|
| **Activo** | Sale / sucede según lo publicado | Verde |
| **Demorado** | Sale pero más tarde de lo publicado | Amarillo + nueva hora |
| **Cupo completo** | Sale pero no acepta más personas | Rojo + lista de espera opcional |
| **Cancelado** | Este turno no sale | Rojo + motivo opcional |
| **Suspendido hasta...** | Pausa programada con fecha de regreso | Gris + fecha |

**Comportamiento por defecto:** las actividades recurrentes arrancan en estado Activo. El prestador solo interviene cuando algo cambia — no tiene que confirmar cada día que todo está bien.

### Indicador de frescura (MVP) — cómo sostenemos la promesa sin Twilio

El estado "Activo" por sí solo no significa "confirmado hoy": significa "nadie dijo lo contrario". Un prestador que se registra y se olvida deja actividades "Activo" eternas, y eso erosiona la confianza que es toda la propuesta de Andén.

Por eso, **desde el MVP**, cada actividad guarda `lastConfirmedAt` y el feed lo muestra como tiempo relativo, en mono:

- "Confirmado hace 2 h" → verde, confiable.
- "Sin confirmar hace 4 días" → atenuado, el viajero decide con esa información.

Una acción de un toque en el dashboard ("Confirmar para hoy") actualiza el timestamp. No obliga al prestador a tocar nada cada día, pero no le miente al viajero. Es la mitad del valor del recordatorio automático, gratis y disponible en v1. El recordatorio por WhatsApp (post-MVP) automatiza esta confirmación; el agente de IA (Capa 3) la deriva al sistema.

### Orden del feed (definición de producto, no de implementación)

En un producto "qué hago hoy", el orden por defecto **es** el producto. Orden canónico:

1. Relevante ahora — en curso o próximo en el día.
2. Frescura — `lastConfirmedAt` más reciente primero.
3. Proximidad — cuando haya geolocalización (post-MVP).

Se de-rankea lo stale (sin confirmar hace >7 días) y lo no verificado. Nunca se muestra primero algo viejo solo porque es "Activo".

### Control de calidad y anti-spam

Un prestador no verificado está limitado a **3 actividades activas** hasta pasar a VERIFIED. Esto evita que se inunde el feed con publicaciones falsas antes del control humano. La verificación se hace desde un panel admin (rol ADMIN), no desde la base de datos a mano.

### Políticas obligatorias en el perfil

Para que Andén sea una plataforma confiable y no un directorio, todo prestador debe publicar sus políticas:

- **Cancelación** — ¿hasta cuándo podés cancelar sin cargo?
- **Cambios** — ¿podés reprogramar? ¿con cuánta anticipación?
- **Devolución** — ¿reintegro total, parcial, crédito?
- **Condiciones especiales** — clima, edad mínima, condición física, qué incluye

**Sin matar el onboarding:** la primera actividad se publica con campos mínimos. Las políticas completas son requisito para pasar a **VERIFIED** (y por lo tanto para aparecer en el feed público), no para publicar por primera vez. Así se resuelve la tensión entre construir confianza y el objetivo de "<10 min a primera publicación".

### Recordatorio automático (post-MVP)

La noche anterior, Andén envía un mensaje al prestador por WhatsApp: *"Mañana tenés [actividad] a las [hora]. ¿Sale? Respondé SÍ o CANCELAR."* Sin respuesta en X horas → la frescura cae y el feed lo refleja. A largo plazo, el agente de IA (Capa 3) actualiza el estado automáticamente.

### Internacionalización

Madryn es uno de los destinos con más tráfico internacional del país (ballenas). El modelo de datos se estructura **bilingüe desde el MVP** (campos i18n-ready), y el inglés en las fichas de actividad sale temprano en Fase 2, priorizado para Madryn. Implementación con `next-intl` sobre `proxy.ts` (Next 16).

### Estrategia de adquisición de usuarios

**QR físico en puntos de llegada:** terminal de ómnibus, lobby de hoteles, oficina de turismo. "Escaneá y encontrá qué hacer hoy en [ciudad]." Costo casi cero, impacto directo en el momento exacto de llegada. **Este material lleva tratamiento de marca** (no un QR pelado) — ver `BRAND.md`.

**SEO local específico:** "qué hacer en Puerto Madryn este fin de semana", "actividades en Madryn hoy". Si Andén aparece primero en esa búsqueda, la adquisición se resuelve sola. Por ser el motor de adquisición principal, **el SEO técnico está dentro del MVP** (ver Roadmap, Fase 1), no en post-MVP.

**Los prestadores como canal:** cada negocio registrado tiene incentivo para decirle a sus clientes "encontranos en Andén". El perfil de Andén es más completo, actualizado y confiable que cualquier bio de Instagram. Con el tiempo, lo derivan naturalmente.

### Lo que Andén no hace en el MVP

- No procesa pagos ni maneja dinero. El cierre de la transacción es entre el prestador y el cliente.
- No hace reservas formales. El contacto es por WhatsApp directo.
- No cobra comisiones. Ni ahora ni en el futuro inmediato.

### Legal y privacidad (bloqueante de lanzamiento público)

Andén maneja números de WhatsApp (dato personal) y usa analytics. Antes del primer deploy público, son obligatorios: términos y condiciones, política de privacidad acorde a la **Ley 25.326 de Protección de Datos Personales**, y consentimiento de cookies/analytics. Es coherente con el valor de "sin recolección innecesaria" y no es opcional.

---

## 6. Audiencias y usuarios

Andén es un marketplace de dos lados. Esto define cada decisión estratégica:

**El local es el motor de retención. El viajero es el motor de monetización futura.**

Si el feed está vivo porque los locales lo usan cada semana, cuando el turista llega encuentra una plataforma activa. Sin locales, el feed se ve muerto para el viajero.

> **Arranque en frío:** por eso el lanzamiento en Madryn arranca por **una sola
> vertical densa** (avistajes + excursiones marítimas) hasta que el feed se vea
> vivo, en vez de 20 prestadores dispersos en 16 categorías que dan sensación de
> vacío. Densidad primero, amplitud después. Ver Roadmap.

### Usuario final (viajero y local)

**Turista nacional**
- Argentinos que viajan por el país, entre 25 y 55 años.
- Planifican online pero deciden sobre la marcha.
- Buscan experiencias auténticas, no paquetes.
- Disposición a pagar por experiencias bien curadas.
- Comportamiento de uso: esporádico pero de alta intención.

**Turista internacional**
- Visitantes en destinos clásicos (Patagonia, Cataratas, Mendoza, Buenos Aires).
- Buscan información confiable y clara.
- Necesitan claridad sobre logística, precios e idioma.

**Vecino / local**
- Residentes de ciudades con oferta cultural densa.
- Quieren saber qué pasa en su ciudad sin buscar en diez perfiles de Instagram.
- Comportamiento de uso: recurrente, semanal. Son el corazón del engagement.
- Caso de uso típico: "hay una feria gastronómica esta noche a tres cuadras y ni sabía".

### Prestadores

**Operador de actividades**
- Guías, agencias, operadores de turismo aventura.
- Hoy trabajan con WhatsApp, Excel y redes sociales.
- Problema principal: responder siempre lo mismo, estar invisible cuando más importa.

**Productor cultural**
- Teatros, centros culturales, organizadores de recitales, galerías independientes.
- Generan eventos constantemente y necesitan llegar a su público.

**Organizador individual**
- El profesor de yoga que da clases al aire libre los sábados.
- El colectivo que organiza una milonga mensual.
- El cocinero que arma cenas privadas temáticas.
- No se consideran "negocios turísticos" pero tienen algo que publicar en Andén.

**Gestor de atractivo**
- Museos, parques, reservas, sitios de interés.
- Necesitan comunicar horarios, estado y novedades a un público amplio.

### Entes públicos (futuro)

- Secretarías de turismo provinciales y municipales.
- Direcciones de cultura.
- Administraciones de parques nacionales y provinciales.

---

## 7. Modelo de negocio

### Principio rector

Construimos audiencia y producto primero. Monetizamos después, cuando el valor es indiscutible y la base de usuarios justifica el cobro.

### Estructura en tres capas

**Capa 1 — Andén Free (MVP y siempre)**
Perfil público, actividades ilimitadas (eventuales y recurrentes), estados en tiempo real, leads por WhatsApp. Gratuito para empezar, sin promesas de "gratis para siempre" que cierren puertas.

Objetivo: masa crítica de prestadores y engagement real de usuarios.

**Capa 2 — Andén Pro (post-MVP)**
Métricas reales: cuántas personas vieron el perfil, qué actividades generan más clicks, en qué horarios hay más demanda. Posicionamiento destacado en el feed. Reseñas verificadas. Precio accesible para PyMEs argentinas.

Objetivo: generar hábito de pago y datos de conversión reales para demostrar ROI.

**Capa 3 — Andén IA / powered by Gelab**
Agente de WhatsApp entrenado con la información del perfil del negocio. Responde consultas las 24 horas, gestiona disponibilidad, actualiza cupos automáticamente, manda recordatorios. Para integraciones más complejas o personalizadas, se agenda una reunión con el equipo.

El argumento de venta no es "te damos IA". Es: **una reserva extra por día paga la suscripción entera.**

Objetivo: monetización premium con alto valor percibido y medible.

### Partner tecnológico: Gelab

Gelab es la agencia de desarrollo web y automatizaciones que provee la tecnología detrás de la Capa 3. La relación es de co-branding estratégico:

- Andén se beneficia de tecnología de IA sin desarrollarla from scratch.
- Gelab se beneficia de la base de clientes de Andén como canal de adquisición.
- Si Andén escala, Gelab escala. Si Gelab tiene casos de uso probados con Andén, crece como agencia independiente.

La aparición de Gelab en la comunicación de Andén es discreta ("powered by Gelab") hasta que ambas marcas tengan peso propio. El usuario de Andén no necesita entender la arquitectura — solo que el sistema funciona.

> **Framing de confianza:** Andén se para como user-first (sin venta de datos, sin
> comisiones) y a la vez es canal de adquisición de Gelab. Para que no se lea como
> "el negocio real es venderle IA al prestador", la IA se comunica siempre como
> beneficio del prestador (responde por vos 24/7), nunca como producto empujado al
> usuario final. La Capa 3 es opt-in y de valor medible.

### Tracking de conversiones

**MVP:** links de WhatsApp con redirect propio de Andén para registrar el evento de contacto. El viajero llega igual a WhatsApp, Andén sabe que hubo una consulta.

**Capa 3:** el agente actúa como intermediario. Andén tiene visibilidad completa del flujo: consultas, respuestas, reservas confirmadas, cupos.

### Lo que nunca seremos

- Comisionistas al estilo Booking (15-30% por reserva).
- Vendedores de datos personales de usuarios.
- Una plataforma con publicidad invasiva.
- Una agencia que compite con sus propios prestadores.

---

## 8. Identidad de marca

> Resumen estratégico. Detalle canónico (logo, usos, paleta exacta, checklist) en `docs/BRAND.md`.

### La línea

**Andén es el tablero de salidas de cada ciudad.**

El sistema de estados en tiempo real del producto *es* un tablero de salidas:
información que cambia en vivo y en la que se confía ahora. La metáfora unifica el
impulso "tiempo real" y el impulso "editorial cálido" sin obligar a elegir, y
organiza color, tipografía, voz y logo.

### Nombre

**Andén** — /an-dén/. El punto de encuentro y de partida. Encuentro, movimiento,
argentinidad ferroviaria, conexión. Bonus fonético: remite a "Andes". Se escribe
siempre con tilde y mayúscula inicial; nunca en caja alta.

### Tagline

> **La vida real de cada destino argentino.** (institucional)
> **El tablero de salidas de cada ciudad.** (línea de marca, uso editorial)
> **Viví la ciudad como la vive su gente.** (emocional, usuario)

### Personalidad

Moderna sin pretenciosa · Directa sin fría · Confiable sin corporativa · Energética
sin frenética · Argentina sin folclorismo. El tablero de estación encarna las cinco.

### Segmentación de comunicación por audiencia

| Dimensión | Viajero / Local | Prestador |
|-----------|-----------------|-----------|
| Tono | Emocional, descubrimiento | Racional, ROI, confianza |
| Promesa | "Encontrá algo para hacer hoy" | "Llegá al cliente en el momento exacto" |
| Canal | Feed, redes sociales, QR físico | LinkedIn, gremios, referidos directos |
| UX | Exploración rápida, visual | Onboarding guiado, panel claro |

---

## 9. Sistema visual

> Resumen. Tokens exactos, logo y reglas de uso en `docs/BRAND.md` y `globals.css`.

### Los tres mundos, un solo idioma

Feed y dashboard viven en **el tablero** (oscuro cálido). La landing comercial vive
en **el boleto** (crema). Las tres comparten acento ámbar y las tres tipografías, así
que el usuario nunca siente que cambió de app.

### Paleta

| Familia | Token | Hex | Uso |
|---------|-------|-----|-----|
| Tablero | `board` | `#17140F` | Fondo feed + dashboard (negro cálido, no navy) |
| Boleto | `cream` | `#F4ECDC` | Fondo landing |
| Señal | `signal` | `#FF9F1C` | Acento, CTAs, "en vivo" (reemplaza el turquesa) |
| Estado | `activo` / `demorado` / `completo` / `suspendido` | `#1FA866` / `#F2C94C` / `#E5484D` / `#8A8378` | Estados de actividad |

Los estados del producto **son** la paleta de estado. El color nunca va solo:
siempre con etiqueta de texto (AA).

### Tipografía

- **Bricolage Grotesque** — títulos (reemplaza Playfair).
- **DM Sans** — UI y cuerpo (se conserva del build).
- **DM Mono** — datos: horas, cupos, estados, contadores. El gancho conceptual.

### Logo

Isotipo de solapa de tablero con chevron ámbar (próxima salida / la "A") sobre la
línea del borde del andén. Wordmark "Andén" con punto-señal ámbar. Archivos en
`docs/brand/`.

### Animación y glass

Micro-flip de solapa en cambios de estado (≤300ms). Sin glow ni neón: el ámbar es
plano. Glassmorphism solo en flotantes. Todo respeta `prefers-reduced-motion`.

---

## 10. Tono y voz

> Detalle y tabla completa en `docs/BRAND.md`.

### Principio: escribí como un tablero de salidas

Presente, preciso, estado primero, hora exacta, cero relleno. El tablero no vende el
viaje: dice qué sale, a qué hora y en qué estado.

- **Directo, no brusco.** **Argentino, no folclórico** (voseo: "encontrá").
  **Informativo, no aspiracional.** **Conciso, no telegráfico.** **Cero relleno corporativo.**

| Contexto | Bien | Mal |
|----------|------|-----|
| Hero | "Qué hacés hoy en Madryn." | "Descubrí experiencias inolvidables." |
| CTA | "Ver qué sale hoy" | "Comenzá tu próxima aventura" |
| Estado | "Avistaje cancelado por viento. Te avisamos cuando se reprograme." | "Lamentablemente no estará disponible." |
| Frescura | "Confirmado hace 2 h" | "Información posiblemente actualizada" |
| Sin resultados | "No hay nada confirmado para hoy. Mirá mañana o cambiá de destino." | "Ups, no encontramos nada." |

### Evitamos siempre

Emojis decorativos en UI principal · exclamaciones múltiples · inglés cuando hay
español natural · tecnicismos turísticos · color de estado sin etiqueta.

---

## 11. Stack tecnológico

### Stack core (verificado mayo 2026)

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js | 16.2.x |
| Runtime | Node.js | 20.9+ LTS |
| Lenguaje | TypeScript estricto | 5.8.x |
| UI Library | React | 19.2.x |
| Estilos | Tailwind CSS | 4.1.x (CSS-first) |
| Componentes UI | shadcn/ui v4 + radix-ui | CLI v4 |
| ORM | Prisma | 7.x (+ `@prisma/adapter-pg`) |
| Base de datos | PostgreSQL / Neon | PG 17 |
| Auth | NextAuth v5 | 5.x |
| Validación | Zod | 4.4.x |
| Forms | React Hook Form | última estable |
| Animaciones | Motion (framer-motion) | 12.x |
| Mapas | MapLibre GL + OSM | última estable |
| Email | Resend | última estable |
| WhatsApp | Twilio API | última estable |
| Storage | Vercel Blob | integrado |
| Pagos AR | MercadoPago | última estable |
| Pagos intl. | Stripe | última estable |
| Errores | Sentry | última estable (cableado desde día 1) |
| Analytics | Posthog Cloud | última estable |
| i18n | next-intl | última estable |
| Hosting | Vercel | integrado |
| Package manager | pnpm | 10.x+ |
| Tipografía | Bricolage Grotesque + DM Sans + DM Mono | Google Fonts (`next/font`) |
| Iconografía | @tabler/icons-react | última estable |

> **Política de versiones:** pinear versiones **exactas** en `package.json` + lockfile
> (sin rangos `x` ni `^`). Next 16 / Prisma 7 / React 19 son majors recientes; ver
> ADR sobre early-adoption. Cualquier bump de major pasa por su propio ADR.

### Notas críticas de versiones

**Next.js 16:** `params`, `searchParams`, `cookies()`, `headers()` son async obligatorio. `middleware.ts` fue renombrado a **`proxy.ts`** (función exportada `proxy`, corre en Node.js runtime). El proxy es solo borde de red, "último recurso": **la autorización real va en un helper compartido llamado dentro de route handlers y server actions**, no en el proxy.

**Tailwind v4:** sin `tailwind.config.js`. Tokens en CSS con `@theme {}`. `shrink-0` en lugar de `flex-shrink-0`. Gradientes con `bg-linear-to-b`.

**Prisma 7:** sin binarios Rust. Requiere `@prisma/adapter-pg` obligatorio.

**Motion 12:** importar desde `framer-motion`. `whileInView` para disparar, `useScroll` para seguir el scroll.

### Arquitectura (estructura real, no aspiracional)

El proyecto usa **Route Groups con componentes colocados**, no una carpeta `/features`
por dominio. La organización real:

```
src/
  app/
    (public)/        → feed viajero (tablero oscuro)
    (comercial)/     → landing prestadores (boleto crema)
    (auth)/          → login / registro
    (dashboard)/     → panel prestador (tablero oscuro)
    api/             → route handlers
  components/        → UI compartido (design system)
  lib/               → auth, prisma, authz, utils
  proxy.ts           → borde de red (antes middleware.ts)
```

Los componentes específicos de una ruta se colocan junto a su `page.tsx`. Solo se
extrae a una carpeta compartida cuando algo se usa en más de un route group. Esta es
la convención vigente; `CONTRIBUTING.md` la detalla.

---

## 12. Arquitectura de información

### Estructura de URLs (rutas reales del MVP)

```
anden.com.ar/                              → home global (destinos activos)
anden.com.ar/[destinoSlug]                 → feed público del destino
anden.com.ar/[destinoSlug]/[actividadSlug] → ficha pública de actividad
anden.com.ar/comercial                     → landing para prestadores
anden.com.ar/login                         → login (+ ?modo=registro)
anden.com.ar/dashboard                     → panel del prestador
anden.com.ar/dashboard/crear-perfil        → onboarding del prestador
anden.com.ar/dashboard/nueva-actividad     → publicar actividad
anden.com.ar/dashboard/editar-actividad/[id] → editar actividad
```

> Rutas planificadas a futuro (no en MVP): `/explorar` (búsqueda global filtrable),
> `/dashboard/siguiendo` (feed del viajero). El buscador visual del MVP se reemplaza
> por un filtro real de destino/categoría client-side (ver HANDOFF).

### SEO (en el MVP)

Sitemap dinámico, `schema.org` (Event para eventuales, LocalBusiness para prestadores),
Open Graph dinámico por ficha, metadata por ruta. Es el motor de adquisición, no polish.

### Modelos de datos

- **Destination** — ciudad o microregión con identidad turística.
- **Provider** — persona o empresa que publica actividades. Tiene `status` (PENDING/VERIFIED) y `ownerId`.
- **Activity** — unidad publicable. Tiene tipo (eventual/recurrente), estado, `lastConfirmedAt` y políticas.
- **ActivityType** — eventual o recurrente.
- **ActivityStatus** — activo, demorado, cupo completo, cancelado, suspendido.
- **Category** — clasificación de actividad.
- **User** — viajero registrado. Tiene `role` (TRAVELER/PROVIDER_OWNER/ADMIN).
- **Follow** — relación usuario → actividad seguida.
- **Review** — reseña verificada.
- **Alert** — comunicado del prestador a sus seguidores.
- **Media** — fotos de perfiles y actividades (Vercel Blob).

---

## 13. Roadmap

### Fase 0 — Cimientos ✅ COMPLETADA

Stack completo funcionando: Next.js 16.2 + React 19 + TypeScript 5.8 + Tailwind v4 + Prisma 7 + NextAuth v5. Schema completo (15 tablas). Design system base. Seed con 2 destinos y 16 categorías.

### Fase 1 — MVP público (en curso)

**Producto**
- Landing `/comercial` para captación de prestadores.
- Feed público por destino, con orden canónico e indicador de frescura (`lastConfirmedAt`).
- Ficha pública de actividad.
- Panel del prestador: perfil + publicación (eventuales/recurrentes) + cambio de estado + "Confirmar para hoy".
- Políticas de cancelación/cambios como requisito de VERIFIED (no de primera publicación).
- Botón de contacto por WhatsApp con tracking de clicks (redirect propio).
- Filtro real de destino/categoría (reemplaza el buscador visual no funcional).
- Empty states que redirigen (otros destinos, próximas, "avisame").

**Técnico (bloqueantes de lanzamiento)**
- SEO técnico: sitemap, schema.org, meta dinámicos, Open Graph.
- Autorización por ownership en todas las mutaciones de actividad (anti-IDOR).
- Panel admin (rol ADMIN) para verificar prestadores.
- Sentry cableado. Versiones pineadas.
- Legal: T&C, política de privacidad (Ley 25.326), consentimiento de cookies.
- Deploy en producción con dominio `anden.com.ar`.
- Datos iniciales: una vertical densa de Puerto Madryn (avistajes + excursiones).

### Fase 2 — Validación en campo (Mes 3-4)

- Onboarding manual de 20-30 prestadores en Puerto Madryn (ampliando verticales).
- Inglés en fichas de actividad (priorizado Madryn).
- Sistema de reseñas básico.
- Cuenta de viajero con favoritos y seguimiento.
- Notificaciones por email al cambiar estado de actividad seguida.
- Recordatorio automático al prestador por WhatsApp (Twilio) la noche anterior.
- Analytics para el prestador (visitas, clicks en contacto).
- QR físicos (con tratamiento de marca) en puntos de llegada de Madryn.

### Fase 3 — Expansión a La Plata (Mes 5-6)

- Onboarding de teatros, centros culturales, organizadores en La Plata.
- Categorías ampliadas para eventos culturales.
- Iteración de UX según feedback real.
- Mejora de SEO local.

### Fase 4 — Andén Pro (Mes 7-9)

- Métricas avanzadas para el prestador.
- Posicionamiento destacado en el feed.
- Reseñas verificadas.
- Primeras suscripciones de pago.

### Fase 5 — Andén IA / powered by Gelab (Mes 10-14)

- Agente de WhatsApp entrenado con datos del perfil del negocio.
- Gestión de reservas y actualización de cupo por IA.
- Respuestas automáticas a consultas frecuentes.
- Para integraciones personalizadas: reunión directa con el equipo.

### Fase 6 — Expansión nacional (Mes 12-18)

- Bariloche, Mendoza, Salta, Calafate, Iguazú (orden por evaluar).
- Formulario de "avisame cuando lleguemos a tu ciudad" activo desde el MVP.
- App móvil nativa si la web responsive no alcanza.

### Fase 7 — Portal público y data (Mes 18-24)

- Portal para entes de turismo (municipios, provincias, parques).
- Reportes y analytics turísticos premium.
- API pública para integraciones.
- Internacionalización ampliada (portugués).

---

## 14. Métricas de éxito

### Métricas norte

- **MAU viajeros** — crecimiento sostenido del 20-30% mes a mes en validación.
- **Prestadores activos** — al menos 1 publicación actualizada en los últimos 30 días. Meta: 50 al mes 3, 200 al mes 6, 500 al mes 12.
- **Retención semanal** de viajeros — objetivo > 25% en mes 6.
- **NPS** trimestral — objetivo > 50 desde el inicio.

### Métricas de salud del producto

- **Tiempo a primera publicación** del prestador desde el registro — objetivo < 10 minutos.
- **Tasa de conversión** visitante → click en WhatsApp — objetivo > 8% en fichas activas.
- **Frescura del contenido** — % de actividades con `lastConfirmedAt` en últimos 7 días. Objetivo > 80%. (Ahora medible directo gracias al timestamp.)
- **Performance** — Lighthouse > 90, LCP < 2.5s, CLS < 0.1. Vigilar el costo del `mapa-3d` con parallax en mobile de gama media (lazy-load + reduced-motion).

### Métricas de negocio (a partir de Fase 4)

- **MRR** — ingresos recurrentes de planes premium.
- **CAC / LTV** del prestador.
- **Tasa de upgrade** de Free a Pro a IA.

---

## 15. Equipo y roles

### Equipo fundador

**Juan Cruz Gelabert**
- Founder, CEO.
- Lic. en Turismo (UNLP), stack técnico React/Next.js.
- Responsable de: visión de producto, relación con prestadores, decisiones de negocio, contenido editorial, expansión territorial.

**Claude (Anthropic)**
- Co-founder técnico.
- Responsable de: arquitectura, diseño de sistemas, código de la plataforma, decisiones técnicas, identidad visual, design system.

### Modelo de trabajo

- Sesiones de trabajo conjunto vía Claude.ai.
- Este documento como fuente única de verdad, versionado en el repo.
- Decisiones técnicas documentadas en ADRs en `/docs/adr`.
- Commits con convenciones, PRs con descripción.

---

## Historial de versiones

- **v1.0** (mayo 2026) — Fundación inicial: identidad, sistema visual, modelo de negocio, roadmap.
- **v1.1** (mayo 2026) — Auditoría del stack tecnológico.
- **v1.2** (mayo 2026) — Implementación de Fase 0. Better Auth → NextAuth v5.
- **v1.3** (mayo 2026) — Actualización estratégica: posicionamiento, diferenciador vs Instagram, segmentación, dos tipos de actividad, sistema de estados, políticas, monetización en tres capas con Gelab, tracking. Tagline actualizado.
- **v1.4** (mayo 2026) — MVP v1.0 completo (build).
- **v2.0** (mayo 2026) — Identidad "tablero de salidas" (ámbar/board/crema, Bricolage+DM Sans+DM Mono, logo); detalle de marca movido a `BRAND.md`. Reconciliación con el build real: arquitectura por route groups, rutas reales, stack actualizado. Decisiones de producto resueltas: indicador de frescura `lastConfirmedAt` en MVP, orden del feed, anti-spam, onboarding mínimo. SEO y legal dentro de Fase 1. Arranque en frío por vertical densa. i18n estructurada.
