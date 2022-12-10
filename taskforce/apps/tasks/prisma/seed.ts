import { PrismaClient } from '@prisma/client';
import { now } from 'mongoose';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.task.upsert({
    where: { id: '1' },
    update: {},
    create: {
      address: 'Москва',
      cost: 10000,
      description: 'LKJJJKLKLK',
      header: 'SADASDA',
      status: 'New',
      authorId: '123',
      dateExecutionAt: now(),
      image: 'fdgdf',
      category: {
        create: {
          title: 'sdfdsfds'
        }
      },
      comments: {
        create: {
          text: 'cool',
          userId: '123',          
        }
      }

    }
  });

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })