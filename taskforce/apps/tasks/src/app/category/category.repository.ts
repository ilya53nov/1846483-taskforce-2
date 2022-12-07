import { Injectable } from '@nestjs/common';
import { Category } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByTitle(title: string): Promise<Category> {
    return await this.prisma.category.findFirst({
      where: {
        title
      },
      include: {
        tasks: true
      }
    });    
  }

  public async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  public async find(titles: string[] = []): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: {
        title: {
          in: titles.length > 0 ? titles : undefined
        }
      },
      include: {
        tasks: true
      }
    });
  } 
}
