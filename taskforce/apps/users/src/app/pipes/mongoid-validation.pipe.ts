import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

enum MongoidValidationExceptionDescription {
  BadMongoid = 'Bad entity ID',
  BadTypeParam = 'This pipe must used only with params!',
}

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MongoidValidationExceptionDescription.BadTypeParam);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MongoidValidationExceptionDescription.BadMongoid);
    }

    return value;
  }
}
