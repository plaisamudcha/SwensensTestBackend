import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from './services/jwt.config';
import { SmsService } from './services/sms.service';

@Module({
  imports: [JwtModule.registerAsync(jwtModuleOptions)],
  providers: [BcryptService, SmsService],
  exports: [BcryptService, SmsService]
})
export class SecurityModule {}
