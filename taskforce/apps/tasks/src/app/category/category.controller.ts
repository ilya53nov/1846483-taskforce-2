import { Controller, HttpStatus, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Route } from '@taskforce/shared-types';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller(Route.Categories)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @ApiResponse({
    type: CreateCategoryDto,
    status: HttpStatus.CREATED,
  })
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }
}
