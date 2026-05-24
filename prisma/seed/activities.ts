import { PrismaClient, ActivityStatus, ActivityType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function seedActivities() {
    console.log('🎯 Seedeando actividades de ejemplo...');
  
    // Crear o buscar usuario admin para los providers
    let adminUser = await prisma.user.findUnique({
      where: { email: 'admin@anden.com' },
    });
  
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
  
    // Get destinos y categorías
    const puertoMadryn = await prisma.destination.findUnique({
      where: { slug: 'puerto-madryn' },
    });
    const laPlata = await prisma.destination.findUnique({
      where: { slug: 'la-plata' },
    });
  
    const avistajeFauna = await prisma.category.findUnique({
      where: { slug: 'avistaje-fauna' },
    });
    const teatro = await prisma.category.findUnique({
      where: { slug: 'teatro' },
    });
    const museos = await prisma.category.findUnique({
      where: { slug: 'museos' },
    });
  
    if (!puertoMadryn || !laPlata || !avistajeFauna || !teatro || !museos) {
      console.error('Destinos o categorías no encontrados');
      return;
    }
  
    // Crear provider de ejemplo (prestador)
    const provider1 = await prisma.provider.upsert({
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
        ownerId: adminUser.id,  // <- Usar el admin user
        latitude: -42.7692,
        longitude: -65.0385,
      },
    });
  
    const provider2 = await prisma.provider.upsert({
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
        ownerId: adminUser.id,  // <- Usar el admin user
        latitude: -34.9111,
        longitude: -57.9544,
      },
    });

  // Actividades Puerto Madryn
  const actividad1 = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'avistaje-ballenas' } },
    update: {},
    create: {
      slug: 'avistaje-ballenas',
      title: 'Avistaje de ballenas francas australes',
      shortDescription: 'Salida en lancha semirrígida para avistar ballenas en Península Valdés. Incluye guía bilingüe.',
      longDescription: 'Excursión de 3 horas navegando las aguas de Península Valdés para observar ballenas francas australes en su hábitat natural. La temporada de avistaje va de junio a diciembre, con mayor presencia entre agosto y octubre.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provider1.id,
      status: ActivityStatus.OPERATING,
      statusNote: 'Salidas diarias con condiciones climáticas favorables',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-12-15'),
      priceFrom: 25000,
      priceTo: 35000,
      priceCurrency: 'ARS',
      maxCapacity: 20,
      currentBookings: 8,
      isPublished: true,
      isFeatured: true,
      whatsappMessage: 'Hola! Me interesa el avistaje de ballenas. ¿Tienen disponibilidad?',
      latitude: -42.5,
      longitude: -64.3,
    },
  });

  await prisma.activityCategory.upsert({
    where: {
      activityId_categoryId: {
        activityId: actividad1.id,
        categoryId: avistajeFauna.id,
      },
    },
    update: {},
    create: {
      activityId: actividad1.id,
      categoryId: avistajeFauna.id,
    },
  });

  const actividad2 = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: puertoMadryn.id, slug: 'pinguinera-punta-tombo' } },
    update: {},
    create: {
      slug: 'pinguinera-punta-tombo',
      title: 'Excursión a Punta Tombo',
      shortDescription: 'Visita a la colonia continental de pingüinos de Magallanes más grande del mundo.',
      longDescription: 'Excursión de día completo a Punta Tombo, hogar de más de un millón de pingüinos de Magallanes. Incluye traslado, guía especializado y tiempo libre en la reserva natural.',
      activityType: ActivityType.EXCURSION,
      destinationId: puertoMadryn.id,
      providerId: provider1.id,
      status: ActivityStatus.LIMITED,
      statusNote: 'Cupos limitados por restricción de acceso en zona de nidificación',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2027-03-31'),
      priceFrom: 45000,
      priceTo: 55000,
      priceCurrency: 'ARS',
      maxCapacity: 30,
      currentBookings: 25,
      isPublished: true,
      latitude: -44.0292,
      longitude: -65.1103,
    },
  });

  await prisma.activityCategory.upsert({
    where: {
      activityId_categoryId: {
        activityId: actividad2.id,
        categoryId: avistajeFauna.id,
      },
    },
    update: {},
    create: {
      activityId: actividad2.id,
      categoryId: avistajeFauna.id,
    },
  });

  // Actividades La Plata
  const actividad3 = await prisma.activity.upsert({
    where: { destinationId_slug: { destinationId: laPlata.id, slug: 'opera-la-traviata' } },
    update: {},
    create: {
      slug: 'opera-la-traviata',
      title: 'La Traviata - Ópera',
      shortDescription: 'Ópera de Giuseppe Verdi en el Teatro Argentino. Función única.',
      longDescription: 'Representación de La Traviata con la Orquesta Estable del Teatro Argentino. Dirección musical: Alejo Pérez. Puesta en escena moderna que respeta la esencia del clásico de Verdi.',
      activityType: ActivityType.CULTURAL_EVENT,
      destinationId: laPlata.id,
      providerId: provider2.id,
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

  await prisma.activityCategory.upsert({
    where: {
      activityId_categoryId: {
        activityId: actividad3.id,
        categoryId: teatro.id,
      },
    },
    update: {},
    create: {
      activityId: actividad3.id,
      categoryId: teatro.id,
    },
  });

  const actividad4 = await prisma.activity.upsert({
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
      latitude: -34.9057,
      longitude: -57.9325,
    },
  });

  await prisma.activityCategory.upsert({
    where: {
      activityId_categoryId: {
        activityId: actividad4.id,
        categoryId: museos.id,
      },
    },
    update: {},
    create: {
      activityId: actividad4.id,
      categoryId: museos.id,
    },
  });

  console.log('  ✓ 4 actividades creadas');
  console.log('  ✓ 2 providers creados');
}