import { Module } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { FortuneController } from './fortune.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FortuneController],
  providers: [FortuneService, PrismaService],
})
export class FortuneModule {}
