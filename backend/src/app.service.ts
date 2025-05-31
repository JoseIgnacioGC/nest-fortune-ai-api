import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async askFortune(_prompt: string) {
    await Promise.resolve(); // Placeholder await call to satisfy linter

    // In a real application, you might want to use an AI service to generate a contextual fortune
    // For now, we'll just return a random one
    throw new HttpException(
      'not yet implemented',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    // return 'nothing right now';
  }
}
