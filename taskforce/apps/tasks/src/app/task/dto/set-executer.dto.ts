import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetExecuterDto {
  @ApiProperty({
    description: 'Индификатор исполнителя',
    example: '123412412'
  })
  @IsString()
  executerId: string;
}
