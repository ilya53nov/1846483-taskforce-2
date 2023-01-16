import { ApiProperty } from '@nestjs/swagger';
import { UserApiProperty } from '../../app.constant';

export class LoginUserDto {
  @ApiProperty(UserApiProperty.Email) 
  public email: string;

  @ApiProperty(UserApiProperty.Password) 
  public password: string;
}
