export interface Comment {
  id?: string;
  text: string;
  taskId: string;
  userId: string;
  createdAt?: Date;
}
