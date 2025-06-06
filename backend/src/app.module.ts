import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FortuneModule } from './fortune/fortune.module';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [FortuneModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
