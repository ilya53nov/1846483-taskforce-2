import { Controller, Post, Body, HttpStatus, Get, UseGuards, Headers, Request, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { AuthService } from './auth.service';
import { LoginUserDto} from './dto/login-user.dto';
import { ApiTag, ParametrKey, Route} from '@taskforce/shared-types'
import { AuthUserDescription, UserValidation} from './auth.constants';
import { AccessTokenGuard, GetUser, RefreshTokenGuard } from '@taskforce/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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
    return this.authService.loginUser(loginTaskUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get(Route.RefreshToken)
  public async refreshTokens(@Request() req, @Headers(ParametrKey.Authorization) bearerToken: string) {
    return this.authService.refreshTokens(req.user.email, bearerToken);
  }

  @Post(Route.UploadAvatar)
  @UseInterceptors(FileInterceptor(ParametrKey.File))
  @UseGuards(AccessTokenGuard)
  public async uploadFile(
    @GetUser(ParametrKey.Id) userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: UserValidation.Avatar.maxSize }),
          new FileTypeValidator({ fileType: UserValidation.Avatar.fileType }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    return this.authService.updateAvatar(userId, {avatar: file.filename});
  }
}
