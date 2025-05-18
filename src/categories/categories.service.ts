import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async create(body: CreateCategoryDto) {
    console.log('createCategory', body);
    return this.prisma.category.create({
      data: body,
    });
  }
}
