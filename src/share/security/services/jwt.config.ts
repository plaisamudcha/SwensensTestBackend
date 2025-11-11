import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/services/jwt-config.service';

export const jwtModuleOptions: JwtModuleAsyncOptions = {
  inject: [JwtConfigService],
  useFactory: (jwtConfig: JwtConfigService) => ({
    secret: jwtConfig.accessJwtSecret,
    signOptions: { expiresIn: jwtConfig.accessJwtTtl }
  })
};
