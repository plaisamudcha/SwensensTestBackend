import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, ConfigModule, ProductModule],
  providers: []
})
export class AppModule {}
