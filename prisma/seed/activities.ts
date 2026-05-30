import { PrismaClient, ActivityStatus, ActivityType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function seedActivities() {
  console.log('🎯 Seedeando actividades...');

  // ── Admin user ────────────────────────────────────────────────────────────
  let adminUser = await prisma.user.findUnique({ where: { email: 'admin@anden.com' } });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@anden.com',
        name: 'Andén Admin',
        emailVerified: true,
        role: 'ADMIN',
      },
    });
    console.log('  ✓ Usuario admin creado');
  }

  // ── Destinos ──────────────────────────────────────────────────────────────
  const puertoMadryn = await prisma.destination.findUniqueOrThrow({ where: { slug: 'puerto-madryn' } });
  const laPlata      = await prisma.destination.findUniqueOrThrow({ where: { slug: 'la-plata' } });

  // ── Categorías ────────────────────────────────────────────────────────────
  const catAvistaje  = await prisma.category.findUniqueOrThrow({ where: { slug: 'avistaje-fauna' } });
  const catTrekking  = await prisma.category.findUniqueOrThrow({ where: { slug: 'trekking' } });
  const catBuceo     = await prisma.category.findUniqueOrThrow({ where: { slug: 'buceo-snorkel' } });
  const catNavegacion= await prisma.category.findUniqueOrThrow({ where: { slug: 'navegacion' } });
  const catTeatro    = await prisma.category.findUniqueOrThrow({ where: { slug: 'teatro' } });
  const catRecitales = await prisma.category.findUniqueOrThrow({ where: { slug: 'recitales' } });
  const catMuseos    = await prisma.category.findUniqueOrThrow({ where: { slug: 'museos' } });
  const catFerias    = await prisma.category.findUniqueOrThrow({ where: { slug: 'ferias' } });
  const catFiestas   = await prisma.category.findUniqueOrThrow({ where: { slug: 'fiestas' } });

  // ── Limpiar actividades de testeo ─────────────────────────────────────────
  // Slugs creados durante desarrollo con contenido inválido o inapropiado.
  const testSlugs = [
    'tour-guiado-por-la-loma-del-orto',
    'feria-gastronomica-en-ciudad-vieja',
    'clases-de-tango-en-la-torre',
    'festival-de-bandas',
  ];
  const deleted = await prisma.activity.deleteMany({
    where: {
      destinationId: puertoMadryn.id,
      slug: { in: testSlugs },
    },
  });
  if (deleted.count > 0) console.log(`  ✓ ${deleted.count} actividad(es) de testeo eliminadas`);

  // ── Providers ─────────────────────────────────────────────────────────────
  const provPatagonia = await prisma.provider.upsert({
    where: { slug: 'patagonia-explorers' },
    update: {},
    create: {
      slug: 'patagonia-explorers',
      name: 'Patagonia Explorers',
      legalName: 'Patagonia Explorers SRL',
      email: 'info@patagoniaexplorers.com',
      phone: '+54 280 445-5000',
      whatsapp: '+54 280 445-5000',
      bio: 'Operador turístico especializado en avistaje de fauna marina y terrestre en Península Valdés.',
      destinationId: puertoMadryn.id,
      status: 'VERIFIED',
      ownerId: adminUser.id,
      // TODO(turismólogo): verificar coordenadas del punto de encuentro real
      latitude: -42.7692,
      longitude: -65.0385,
    },
  });

  const provMadrynActivo = await prisma.provider.upsert({
    where: { slug: 'madryn-activo' },
    update: {},
    create: {
      slug: 'madryn-activo',
      name: 'Madryn Activo Turismo',
      legalName: 'Madryn Activo Turismo SRL',
      email: 'reservas@madrynactivo.com',
      phone: '+54 280 446-7000',
      whatsapp: '+54 280 446-7000',
      bio: 'Operador de deportes acuáticos en Puerto Madryn. Buceo con lobos marinos y kayak de mar desde Bahía Nueva.',
      destinationId: puertoMadryn.id,
      status: 'VERIFIED',
      ownerId: adminUser.id,
      // TODO(turismólogo): verificar coordenadas del muelle de salida en Puerto Pirámides
      latitude: -42.5757,
      longitude: -64.2857,
    },
  });

  const provTeatroArgentino = await prisma.provider.upsert({
    where: { slug: 'teatro-argentino' },
    update: {},
    create: {
      slug: 'teatro-argentino',
      name: 'Teatro Argentino',
      legalName: 'Teatro Argentino de La Plata',
      email: 'info@teatroargentino.gba.gob.ar',
      phone: '+54 221 429-1234',
      bio: 'Principal teatro de ópera y sala de conciertos de La Plata.',
      destinationId: laPlata.id,
      status: 'VERIFIED',
      ownerId: adminUser.id,
      latitude: -34.9111,
      longitude: -57.9544,
    },
  });

  const provCulturalLP = await prisma.provider.upsert({
    where: { slug: 'produccion-cultural-lp' },
    update: {},
    create: {
      slug: 'produccion-cultural-lp',
      name: 'Producción Cultural LP',
      legalName: 'Producción Cultural LP SA',
      email: 'info@produccioncultural.lp.ar',
      phone: '+54 221 450-8000',
      bio: 'Gestora de eventos culturales en La Plata: milongas, ciclos de jazz, ferias y exposiciones.',
      destinationId: laPlata.id,
      status: 'VERIFIED',
      ownerId: adminUser.id,
      // TODO(turismólogo): verificar dirección y coordenadas de la sede operativa
      latitude: -34.9215,
      longitude: -57.9545,
    },
  });

  // ── Helper para vincular categorías ──────────────────────────────────────
  async function linkCategory(activityId: string, categoryId: string) {
    await prisma.activityCategory.upsert({
      where: { activityId_categoryId: { activityId, categoryId } },
      update: {},
      create: { activityId, categoryId },
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PUERTO MADRYN — 5 actividades
  // ══════════════════════════════════════════════════════════════════════════

  // 1 — Avistaje de ballenas francas australes (existente)
  const actBallenas = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'avistaje-ballenas' } },
    update: {},
    create: {
      slug: 'avistaje-ballenas',
      title: 'Avistaje de ballenas francas australes',
      shortDescription: 'Salida en lancha semirrígida para avistar ballenas en Península Valdés. Incluye guía bilingüe.',
      longDescription: 'Excursión de 3 horas navegando las aguas de Península Valdés para observar ballenas francas australes en su hábitat natural. La temporada de avistaje va de junio a diciembre, con mayor presencia entre agosto y octubre.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provPatagonia.id,
      status: ActivityStatus.OPERATING,
      statusNote: 'Salidas diarias con condiciones climáticas favorables',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-12-15'),
      priceFrom: 25000,
      priceTo: 35000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar rango de precios de temporada 2026
      maxCapacity: 20,
      currentBookings: 8,
      isPublished: true,
      isFeatured: true,
      whatsappMessage: '¡Hola! Me interesa el avistaje de ballenas. ¿Tienen disponibilidad?',
      // TODO(turismólogo): verificar punto de embarque (¿muelle central o muelle turístico?)
      latitude: -42.7674,
      longitude: -65.0347,
    },
  });
  await linkCategory(actBallenas.id, catAvistaje.id);

  // 2 — Excursión a Punta Tombo (existente)
  const actTombo = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'pinguinera-punta-tombo' } },
    update: {},
    create: {
      slug: 'pinguinera-punta-tombo',
      title: 'Excursión a Punta Tombo',
      shortDescription: 'Visita a la colonia continental de pingüinos de Magallanes más grande del mundo.',
      longDescription: 'Excursión de día completo a Punta Tombo, hogar de más de un millón de pingüinos de Magallanes. Incluye traslado, guía especializado y tiempo libre en la reserva natural.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provPatagonia.id,
      status: ActivityStatus.LIMITED,
      statusNote: 'Cupos limitados por restricción de acceso en zona de nidificación',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2027-03-31'),
      priceFrom: 45000,
      priceTo: 55000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar precio y si incluye ingreso a la reserva (antes era aparte)
      maxCapacity: 30,
      currentBookings: 25,
      isPublished: true,
      // TODO(turismólogo): verificar coordenadas; la reserva está ~110 km al sur de Madryn
      latitude: -44.0292,
      longitude: -65.1103,
    },
  });
  await linkCategory(actTombo.id, catAvistaje.id);

  // 3 — Buceo con lobos marinos en Puerto Pirámides (nuevo)
  const actBuceo = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'buceo-lobos-marinos' } },
    update: {},
    create: {
      slug: 'buceo-lobos-marinos',
      title: 'Buceo con lobos marinos en Puerto Pirámides',
      shortDescription: 'Inmersión guiada a 12 m en el arrecife de Puerto Pirámides. Lobos marinos nadan entre los buceadores todo el año.',
      longDescription: 'Salida en embarcación neumática desde el muelle de Puerto Pirámides hasta el arrecife donde reside la colonia. La inmersión dura 40 min en agua a 12–15°C; traje de 7 mm incluido. Cupo máximo de 8 buceadores por guía certificado CMAS.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provMadrynActivo.id,
      status: ActivityStatus.OPERATING,
      statusNote: 'Salidas disponibles todo el año según condiciones de mar',
      priceFrom: 35000,
      priceTo: 50000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar precios, profundidad media del arrecife y temperatura real del agua según mes
      maxCapacity: 8,
      currentBookings: 0,
      isPublished: true,
      isFeatured: false,
      whatsappMessage: '¡Hola! Quiero reservar el buceo con lobos marinos. ¿Tienen fechas disponibles?',
      meetingPoint: 'Muelle de Puerto Pirámides',
      // TODO(turismólogo): verificar coordenadas del muelle de Puerto Pirámides
      latitude: -42.5757,
      longitude: -64.2857,
    },
  });
  await linkCategory(actBuceo.id, catBuceo.id);

  // 4 — Kayak de mar en Bahía Nueva (nuevo)
  const actKayak = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'kayak-bahia-nueva' } },
    update: {},
    create: {
      slug: 'kayak-bahia-nueva',
      title: 'Kayak de mar en Bahía Nueva',
      shortDescription: 'Salida de 2 h en kayak biplaza desde Playa El Doradillo. Toninas overas y cormoranes en temporada.',
      longDescription: 'Recorrido de costa por la bahía protegida desde la playa El Doradillo con guía de fauna. El guía señala lobos marinos, toninas y aves marinas; las condiciones de mar plano se mantienen la mayor parte del año. No se requiere experiencia previa; equipo completo incluido.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provMadrynActivo.id,
      status: ActivityStatus.OPERATING,
      priceFrom: 18000,
      priceTo: 22000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar si el avistaje de toninas overas es frecuente en Bahía Nueva o es estacional
      maxCapacity: 12,
      currentBookings: 0,
      isPublished: true,
      whatsappMessage: '¡Hola! Quiero reservar el kayak en Bahía Nueva. ¿Tienen disponibilidad?',
      meetingPoint: 'Playa El Doradillo — bajada principal',
      // TODO(turismólogo): verificar coordenadas de la bajada de El Doradillo
      latitude: -42.6633,
      longitude: -64.8456,
    },
  });
  await linkCategory(actKayak.id, catNavegacion.id);

  // 5 — Trekking al atardecer en Punta Loma (nuevo)
  const actTrekking = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'trekking-punta-loma' } },
    update: {},
    create: {
      slug: 'trekking-punta-loma',
      title: 'Trekking al atardecer en Punta Loma',
      shortDescription: 'Senderismo guiado al atardecer hasta el mirador de la reserva de lobos marinos. 6 km, salida 2 h antes del ocaso.',
      longDescription: 'Recorrido por el acantilado de Punta Loma hasta 45 m sobre el mar. Desde el mirador se observa la colonia de lobos marinos y, en temporada de ballenas, ejemplares en el horizonte. Duración total 3 h; linterna y calzado cerrado obligatorio.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provPatagonia.id,
      status: ActivityStatus.OPERATING,
      priceFrom: 12000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar distancia real del sendero y altura del acantilado en Punta Loma
      maxCapacity: 15,
      currentBookings: 0,
      isPublished: true,
      whatsappMessage: '¡Hola! Me interesa el trekking al atardecer en Punta Loma. ¿Tienen fechas?',
      meetingPoint: 'Acceso a Reserva Punta Loma — km 17 Ruta 1',
      // TODO(turismólogo): verificar coordenadas del acceso a la reserva Punta Loma
      latitude: -42.8200,
      longitude: -64.9500,
    },
  });
  await linkCategory(actTrekking.id, catTrekking.id);

  // ══════════════════════════════════════════════════════════════════════════
  // LA PLATA — 5 actividades
  // ══════════════════════════════════════════════════════════════════════════

  // 1 — La Traviata (existente)
  const actTraviata = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'opera-la-traviata' } },
    update: {},
    create: {
      slug: 'opera-la-traviata',
      title: 'La Traviata — Ópera',
      shortDescription: 'Ópera de Giuseppe Verdi en el Teatro Argentino. Función única.',
      longDescription: 'Representación de La Traviata con la Orquesta Estable del Teatro Argentino. Dirección musical: Alejo Pérez. Puesta en escena moderna que respeta la esencia del clásico de Verdi.',
      activityType: ActivityType.CULTURAL_EVENT,
      destinationId: laPlata.id,
      providerId: provTeatroArgentino.id,
      status: ActivityStatus.SOLD_OUT,
      statusNote: 'Entradas agotadas. Lista de espera disponible.',
      startDate: new Date('2026-06-15T20:00:00'),
      priceFrom: 8500,
      priceTo: 25000,
      priceCurrency: 'ARS',
      maxCapacity: 850,
      currentBookings: 850,
      isPublished: true,
      isFeatured: true,
      latitude: -34.9111,
      longitude: -57.9544,
    },
  });
  await linkCategory(actTraviata.id, catTeatro.id);

  // 2 — Museo de Ciencias Naturales (existente)
  const actMuseo = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'museo-ciencias-naturales' } },
    update: {},
    create: {
      slug: 'museo-ciencias-naturales',
      title: 'Museo de Ciencias Naturales',
      shortDescription: 'Visita al museo con la colección paleontológica más importante de Sudamérica.',
      longDescription: 'Museo fundado por Francisco P. Moreno en 1884. Alberga más de 3 millones de objetos, destacando su sala de paleontología con esqueletos de dinosaurios y megafauna sudamericana.',
      activityType: ActivityType.ATTRACTION,
      destinationId: laPlata.id,
      status: ActivityStatus.OPERATING,
      statusNote: 'Abierto de martes a domingo',
      schedule: {
        tue: '10:00-18:00',
        wed: '10:00-18:00',
        thu: '10:00-18:00',
        fri: '10:00-18:00',
        sat: '10:00-20:00',
        sun: '10:00-20:00',
      },
      isFree: true,
      isPublished: true,
      // TODO(turismólogo): verificar horarios actuales y si el ingreso sigue siendo libre (a veces cobra entrada)
      latitude: -34.9057,
      longitude: -57.9325,
    },
  });
  await linkCategory(actMuseo.id, catMuseos.id);

  // 3 — Milonga del Pasaje Dardo Rocha (nuevo)
  const actMilonga = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'milonga-dardo-rocha' } },
    update: {},
    create: {
      slug: 'milonga-dardo-rocha',
      title: 'Milonga del Pasaje Dardo Rocha',
      shortDescription: 'Milonga clásica en el salón histórico del Pasaje Dardo Rocha. Primer y tercer viernes de cada mes, 22:00.',
      longDescription: 'Vals, tango y milonga en uno de los salones más bellos del patrimonio platense. La practicante arranca a las 20:00 para repasar pasos antes de la milonga oficial. Piso de madera, orquesta en vivo los viernes impar.',
      activityType: ActivityType.NIGHTLIFE_EVENT,
      destinationId: laPlata.id,
      providerId: provCulturalLP.id,
      status: ActivityStatus.OPERATING,
      isRecurring: true,
      // Primer y tercer viernes de cada mes
      recurrenceRule: 'FREQ=MONTHLY;BYDAY=1FR,3FR',
      priceFrom: 6000,
      priceTo: 9000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): verificar si la milonga en el Dardo Rocha sigue activa y si es la que cierra estos días
      maxCapacity: 120,
      currentBookings: 0,
      isPublished: true,
      whatsappMessage: '¡Hola! Quiero información sobre la milonga del Pasaje Dardo Rocha.',
      meetingPoint: 'Pasaje Dardo Rocha — Calle 50 entre 6 y 7, La Plata',
      latitude: -34.9210,
      longitude: -57.9530,
    },
  });
  await linkCategory(actMilonga.id, catFiestas.id);

  // 4 — Ciclo de Jazz en el Coliseo Podestá (nuevo)
  const actJazz = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'jazz-coliseo-podesta' } },
    update: {},
    create: {
      slug: 'jazz-coliseo-podesta',
      title: 'Ciclo Jazz en el Coliseo Podestá',
      // 14/06/2026 cae en domingo — corregido del plan original que decía sábado
      shortDescription: 'Ciclo mensual de jazz en el teatro más antiguo de La Plata. Próxima fecha: dom. 14/06, 21:00.',
      longDescription: 'El Teatro Coliseo Podestá — Monumento Histórico Nacional desde 1998 — abre su temporada de jazz con artistas de Buenos Aires y La Plata. Tres formatos que rotan cada mes: trío, cuarteto y big band. Puertas abren 30 minutos antes del inicio.',
      activityType: ActivityType.CULTURAL_EVENT,
      destinationId: laPlata.id,
      providerId: provCulturalLP.id,
      status: ActivityStatus.OPERATING,
      startDate: new Date('2026-06-14T21:00:00'),
      isRecurring: true,
      recurrenceRule: 'FREQ=MONTHLY;BYDAY=2SU',
      priceFrom: 8000,
      priceTo: 15000,
      priceCurrency: 'ARS',
      // TODO(turismólogo): confirmar si el ciclo de jazz existe en el Podestá o en otro teatro platense
      maxCapacity: 480,
      currentBookings: 0,
      isPublished: true,
      isFeatured: true,
      whatsappMessage: '¡Hola! Quiero información sobre el ciclo de jazz en el Coliseo Podestá.',
      meetingPoint: 'Teatro Coliseo Podestá — Calle 10 entre 46 y 47, La Plata',
      latitude: -34.9175,
      longitude: -57.9510,
    },
  });
  await linkCategory(actJazz.id, catRecitales.id);

  // 5 — Feria del Libro Independiente (nuevo)
  const actFeria = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'feria-libro-independiente' } },
    update: {},
    create: {
      slug: 'feria-libro-independiente',
      title: 'Feria del Libro Independiente',
      shortDescription: 'Feria de editoriales independientes en la Plaza Italia. 60 stands, presentaciones de autores y talleres de ilustración, entrada libre.',
      longDescription: 'Tres días en la Plaza Italia con más de 60 sellos independientes de todo el país. Agenda paralela con presentaciones, mesas de debate y talleres de ilustración para chicos. Las actividades con cupo tienen inscripción gratuita en el stand central.',
      activityType: ActivityType.FESTIVAL,
      destinationId: laPlata.id,
      providerId: provCulturalLP.id,
      status: ActivityStatus.SCHEDULED,
      statusNote: 'Confirmada para el fin de semana largo de julio',
      startDate: new Date('2026-07-04'),
      endDate: new Date('2026-07-06'),
      isFree: true,
      // TODO(turismólogo): confirmar si la feria del libro independiente se hace en Plaza Italia o en otro espacio público
      maxCapacity: 2000,
      currentBookings: 0,
      isPublished: true,
      whatsappMessage: '¡Hola! Quiero información sobre la Feria del Libro Independiente en La Plata.',
      meetingPoint: 'Plaza Italia — Diagonal 80 y 44, La Plata',
      latitude: -34.9185,
      longitude: -57.9467,
    },
  });
  await linkCategory(actFeria.id, catFerias.id);

  console.log('  ✓ 5 actividades en Puerto Madryn');
  console.log('  ✓ 5 actividades en La Plata');
  console.log('  ✓ 4 providers (2 existentes + 2 nuevos VERIFIED)');
  console.log('  ⚠️  Imágenes no incluidas — asignar desde el dashboard');
  console.log('  ⚠️  Coordenadas y datos de lugar marcados con TODO(turismólogo)');
}
