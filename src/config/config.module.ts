import { Global, Module } from '@nestjs/common';
import { ConfigModule as MyConfigModule } from '@nestjs/config';
import { validate } from './schemas/env.schema';
import { JwtConfigService } from './services/jwt-config.service';

@Global()
@Module({
  imports: [MyConfigModule.forRoot({ validate })],
  providers: [JwtConfigService],
  exports: [JwtConfigService]
})
export class ConfigModule {}
