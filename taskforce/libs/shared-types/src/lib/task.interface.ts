import { Category } from './category.interface';
import { Comment } from './comment.interface';

export interface Task {
  id?: string;
  header: string;
  description: string;
  category?: Category;
  cost?: number;
  dateExecutionAt?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  createdAt?: Date;
  authorId: string;
  executerId?: string;
  comments?: Comment[];
  reactions?: string[];
  status?: string;  
}
