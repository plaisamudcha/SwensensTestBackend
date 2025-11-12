import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from './services/jwt.config';
import { SmsService } from './services/sms.service';
import { AuthTokenService } from './services/auth-token.service';

@Module({
  imports: [JwtModule.registerAsync(jwtModuleOptions)],
  providers: [BcryptService, SmsService, AuthTokenService],
  exports: [BcryptService, SmsService, AuthTokenService]
})
export class SecurityModule {}
