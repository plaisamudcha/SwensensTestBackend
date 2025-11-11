import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { SecurityModule } from './share/security/security.module';
import { BcryptService } from './security/services/bcrypt.service';

@Module({
  imports: [DatabaseModule, ConfigModule, ProductModule, UserModule, SecurityModule],
  providers: [BcryptService]
})
export class AppModule {}
