import { Entity } from '@taskforce/core';
import { Category } from '@taskforce/shared-types';

export class CategoryEntity implements Entity<CategoryEntity>, Category {
  public title: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public toObject(): CategoryEntity {
    return {...this};
  }

  public fillEntity(entity: Category) {
    this.title = entity.title;
  }
}
