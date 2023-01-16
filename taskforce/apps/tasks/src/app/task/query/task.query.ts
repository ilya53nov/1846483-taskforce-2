import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection, TaskQueryParametr } from '../task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || TaskQueryParametr.DefaultTaskCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = TaskQueryParametr.DefaultTaskCountLimit;

  @Transform(({ value }) => value.split(TaskQueryParametr.Separator).map((categoryTitle) => categoryTitle))
  @IsArray({})
  @IsOptional()
  public categories?: string[];

  @Transform(({ value }) => value.split(TaskQueryParametr.Separator).map((tags) => tags))
  @IsArray({})
  @IsOptional()
  public tags?: string[];

  @Transform(({ value }) => value.split(TaskQueryParametr.Separator).map((cities) => cities))
  @IsArray({})
  @IsOptional()
  public cities?: string[];

  @IsIn([SortDirection.Asc, SortDirection.Desc])
  @IsOptional()
  public sortDirection: SortDirection.Desc | SortDirection.Asc = TaskQueryParametr.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
