import { ConfigService, registerAs } from '@nestjs/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { Route } from '@taskforce/shared-types';
import { join } from 'path';

export const staticOptions = registerAs('static', () => ({
  upload: process.env.UPLOAD_DESTINATION,
}));

export function getServeStaticConfig(configService: ConfigService): ServeStaticModuleOptions[] {
  const uploadFolder = configService.get<string>('static.upload');

  return [
    {
      rootPath: join(__dirname, uploadFolder),
      serveRoot: `/${Route.Static}`,
    },
  ];
}
