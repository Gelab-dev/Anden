import 'dotenv/config';
import { PrismaClient, ActivityType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { seedActivities } from './activities';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Seed inicial de Andén.
 * Crea destinos piloto y categorías base.
 * Idempotente: se puede correr varias veces sin duplicar.
 */

async function main() {
  console.log('🌱 Iniciando seed de Andén...');

  // --- Destinos ---
  await seedDestinations();

  // --- Categorías ---
  await seedCategories();

  // --- Actividades ---
  await seedActivities();

  console.log('✅ Seed completado con éxito.');
}

async function seedDestinations() {
  console.log('📍 Seedeando destinos...');

  const destinations = [
    {
      slug: 'puerto-madryn',
      name: 'Puerto Madryn',
      province: 'Chubut',
      country: 'AR',
      latitude: -42.7692,
      longitude: -65.0385,
      shortDescription:
        'Puerta de entrada a Península Valdés. Avistaje de ballenas, fauna patagónica y costa atlántica.',
      isActive: true,
      isFeatured: true,
      launchDate: new Date('2026-06-01'),
    },
    {
      slug: 'la-plata',
      name: 'La Plata',
      province: 'Buenos Aires',
      country: 'AR',
      latitude: -34.9215,
      longitude: -57.9545,
      shortDescription:
        'Ciudad universitaria con intensa agenda cultural. Teatro, recitales, museos y vida nocturna.',
      isActive: true,
      isFeatured: true,
      launchDate: new Date('2026-08-01'),
    },
  ];

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: dest,
      create: dest,
    });
    console.log(`  ✓ ${dest.name}`);
  }
}

async function seedCategories() {
  console.log('🏷️  Seedeando categorías...');

  const categories = [
    // EXCURSION
    {
      slug: 'avistaje-fauna',
      name: 'Avistaje de fauna',
      activityType: ActivityType.EXCURSION,
      iconName: 'binoculars',
      colorHex: '#10B981',
    },
    {
      slug: 'trekking',
      name: 'Trekking y senderismo',
      activityType: ActivityType.EXCURSION,
      iconName: 'mountain',
      colorHex: '#10B981',
    },
    {
      slug: 'buceo-snorkel',
      name: 'Buceo y snorkel',
      activityType: ActivityType.EXCURSION,
      iconName: 'wave',
      colorHex: '#3B82F6',
    },
    {
      slug: 'navegacion',
      name: 'Navegación',
      activityType: ActivityType.EXCURSION,
      iconName: 'sailboat',
      colorHex: '#3B82F6',
    },

    // CULTURAL_EVENT
    {
      slug: 'teatro',
      name: 'Teatro',
      activityType: ActivityType.CULTURAL_EVENT,
      iconName: 'masks-theater',
      colorHex: '#8B5CF6',
    },
    {
      slug: 'recitales',
      name: 'Recitales y música en vivo',
      activityType: ActivityType.CULTURAL_EVENT,
      iconName: 'music',
      colorHex: '#8B5CF6',
    },
    {
      slug: 'cine',
      name: 'Cine y ciclos',
      activityType: ActivityType.CULTURAL_EVENT,
      iconName: 'movie',
      colorHex: '#8B5CF6',
    },

    // EXHIBITION
    {
      slug: 'museos',
      name: 'Museos',
      activityType: ActivityType.EXHIBITION,
      iconName: 'building-monument',
      colorHex: '#F59E0B',
    },
    {
      slug: 'exposiciones',
      name: 'Exposiciones',
      activityType: ActivityType.EXHIBITION,
      iconName: 'palette',
      colorHex: '#F59E0B',
    },

    // ATTRACTION
    {
      slug: 'parques-naturales',
      name: 'Parques y reservas',
      activityType: ActivityType.ATTRACTION,
      iconName: 'tree',
      colorHex: '#10B981',
    },
    {
      slug: 'miradores',
      name: 'Miradores',
      activityType: ActivityType.ATTRACTION,
      iconName: 'mountain-snow',
      colorHex: '#10B981',
    },

    // WORKSHOP
    {
      slug: 'talleres',
      name: 'Talleres y clases',
      activityType: ActivityType.WORKSHOP,
      iconName: 'school',
      colorHex: '#F59E0B',
    },

    // FESTIVAL
    {
      slug: 'festivales',
      name: 'Festivales',
      activityType: ActivityType.FESTIVAL,
      iconName: 'confetti',
      colorHex: '#EC4899',
    },
    {
      slug: 'ferias',
      name: 'Ferias y mercados',
      activityType: ActivityType.FESTIVAL,
      iconName: 'basket',
      colorHex: '#EC4899',
    },

    // GASTRONOMIC_EVENT
    {
      slug: 'cenas-tematicas',
      name: 'Cenas y experiencias gastronómicas',
      activityType: ActivityType.GASTRONOMIC_EVENT,
      iconName: 'tools-kitchen-2',
      colorHex: '#F59E0B',
    },

    // NIGHTLIFE_EVENT
    {
      slug: 'fiestas',
      name: 'Fiestas y eventos nocturnos',
      activityType: ActivityType.NIGHTLIFE_EVENT,
      iconName: 'moon-stars',
      colorHex: '#8B5CF6',
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    console.log(`  ✓ ${cat.name}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });