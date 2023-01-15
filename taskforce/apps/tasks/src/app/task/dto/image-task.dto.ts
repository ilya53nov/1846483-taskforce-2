import { Matches } from 'class-validator';
import { TaskValidation } from '../task.constant';

export class ImageTaskDto {
  @Matches(TaskValidation.Image.fileType, { message: 'Avatar must be jpg, png' })
  public image: string;
}
