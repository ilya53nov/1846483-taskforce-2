import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';
import { CategoryRepository } from './category.repository';
import { CategoryRdo } from './rdo/category.rdo';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories.map((item) => fillObject(CategoryRdo, item));
  }
}
