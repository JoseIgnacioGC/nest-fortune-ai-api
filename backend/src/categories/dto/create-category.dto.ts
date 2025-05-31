import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30, { message: 'Max length is 30 characters' })
  name: string;
}
