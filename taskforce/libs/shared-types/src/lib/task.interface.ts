export interface Task {
  _id?: string;
  header: string;
  description: string;
  category: string;
  cost?: number;
  dateExecution?: Date;
  image?: string;
  address?: string;
  tags: string[];
}