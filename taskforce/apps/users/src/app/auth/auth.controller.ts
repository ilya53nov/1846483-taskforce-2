import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { AuthService } from './auth.service';
import { LoginUserDto} from './dto/login-user.dto';
import { ApiTag, Route} from '@taskforce/shared-types'
import { AuthUserDescription} from './auth.constants';

@ApiTags(ApiTag.Auth)
@Controller(Route.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Route.Register)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthUserDescription.Created
  })
  public async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);    
  }

  @Post(Route.Login)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthUserDescription.Logged
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthUserDescription.PasswordOrLoginWrong
  })
  public async login(@Body() loginTaskUserDto: LoginUserDto) {
    return await this.authService.login(loginTaskUserDto);    
  }

}
