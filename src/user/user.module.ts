import { Module } from '@nestjs/common';
import { SecurityModule } from 'src/share/security/security.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [SecurityModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
