import { ApiProperty } from '@nestjs/swagger';

export class SetExecuterDto {
  @ApiProperty({
    description: 'Индификатор исполнителя',
    example: '123412412'
  })
  idExecuter: string;
}
