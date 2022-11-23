export class CreateTaskDto {
  header: string;
  description: string;
  category: string;
  cost?: number;
  dateExecution?: Date;
  image?: string;
  address?: string;
  tags: string[];
}
