import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from './services/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtModuleOptions)],
  providers: [BcryptService],
  exports: [BcryptService]
})
export class SecurityModule {}
