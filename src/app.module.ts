import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { SecurityModule } from './share/security/security.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    ProductModule,
    UserModule,
    SecurityModule
  ]
})
export class AppModule {}
