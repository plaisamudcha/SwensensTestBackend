import { Global, Module } from '@nestjs/common';
import { ConfigModule as MyConfigModule } from '@nestjs/config';
import { validate } from './schemas/env.schema';
import { JwtConfigService } from './services/jwt-config.service';
import { OtpConfigService } from './services/otp-config.service';

@Global()
@Module({
  imports: [MyConfigModule.forRoot({ validate })],
  providers: [JwtConfigService, OtpConfigService],
  exports: [JwtConfigService, OtpConfigService]
})
export class ConfigModule {}
