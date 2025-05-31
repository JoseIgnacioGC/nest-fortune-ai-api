import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'love' } }),
    prisma.category.create({ data: { name: 'career' } }),
    prisma.category.create({ data: { name: 'health' } }),
  ]);

  const fortunes = [
    {
      fortune: 'A wonderful journey awaits you',
      categories: [categories[0], categories[1]],
    },
    {
      fortune: 'Good health and happiness will come your way',
      categories: [categories[2]],
    },
    {
      fortune: 'A new opportunity will present itself soon',
      categories: [categories[1]],
    },
  ];
  await Promise.all(
    fortunes.map((fortune) =>
      prisma.fortune.create({
        data: {
          fortune: fortune.fortune,
          categories: {
            connect: fortune.categories.map((cat) => ({ id: cat.id })),
          },
        },
      }),
    ),
  );
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
