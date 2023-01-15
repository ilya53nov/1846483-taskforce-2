import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { TaskValidation } from '../task.constant';

const TAGS_VALIDATOR = 'tagsValidator';

@ValidatorConstraint({ name: TAGS_VALIDATOR })
export class TagsValidator implements ValidatorConstraintInterface {
  validate(tags: string[] = []): boolean {
    if (tags.length <= TaskValidation.TagsMaxCount) {
      return tags.every((tag) => tag.charAt(0).match(/\D/) && tag.length >= TaskValidation.TagLength.min && tag.length <= TaskValidation.TagLength.max)
    }
    return false
  }
}
