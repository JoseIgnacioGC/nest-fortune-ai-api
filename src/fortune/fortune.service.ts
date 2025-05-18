import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FortuneService {
  constructor(private readonly prisma: PrismaService) {}
  async getRandomFortune() {
    const count = await this.prisma.fortune.count();
    const skip = Math.floor(Math.random() * count);
    const fortune = await this.prisma.fortune.findFirst({
      skip,
      include: {
        categories: true,
      },
    });
    return {
      fortune: fortune?.text || 'No fortune available',
      categories: fortune?.categories.map((c) => c.name) || [],
    };
  }
  // create(_createFortuneDto: CreateFortuneDto) {
  //   return 'This action adds a new fortune';
  // }
  // findAll() {
  //   return `This action returns all fortune`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} fortune`;
  // }
  // update(id: number, _updateFortuneDto: UpdateFortuneDto) {
  //   return `This action updates a #${id} fortune`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} fortune`;
  // }
}
