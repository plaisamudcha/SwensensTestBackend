import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '../schemas/base.schema';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService<JwtConfig, true>) {}

  get accessJwtSecret() {
    return this.configService.get('ACCESS_JWT_SECRET', { infer: true });
  }

  get accessJwtTtl() {
    return this.configService.get('ACCESS_JWT_TTL', { infer: true });
  }
}
