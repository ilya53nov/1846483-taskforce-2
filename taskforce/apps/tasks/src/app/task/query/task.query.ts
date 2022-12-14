import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TASK_COUNT_LIMIT, QUERY_SEPARATOR, SortDirection } from '../task.constant';

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(QUERY_SEPARATOR).map((categoryTitle) => categoryTitle))
  @IsArray({})
  @IsOptional()
  public categories?: string[];

  @IsIn([SortDirection.Asc, SortDirection.Desc])
  @IsOptional()
  public sortDirection: SortDirection.Desc | SortDirection.Asc = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
