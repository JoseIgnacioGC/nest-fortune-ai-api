import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'love' } }),
    prisma.category.create({ data: { name: 'career' } }),
    prisma.category.create({ data: { name: 'health' } }),
  ]);

  // Create fortunes with categories
  await prisma.fortune.create({
    data: {
      text: 'A wonderful journey awaits you',
      categories: {
        connect: [{ id: categories[0].id }, { id: categories[1].id }],
      },
    },
  });

  await prisma.fortune.create({
    data: {
      text: 'Good health and happiness will come your way',
      categories: {
        connect: [{ id: categories[2].id }],
      },
    },
  });

  await prisma.fortune.create({
    data: {
      text: 'A new opportunity will present itself soon',
      categories: {
        connect: [{ id: categories[1].id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
