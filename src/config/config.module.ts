import { Global, Module } from '@nestjs/common';
import { ConfigModule as MyConfigModule } from '@nestjs/config';
import { validate } from './schemas/env.schema';

@Global()
@Module({
  imports: [MyConfigModule.forRoot({ validate })]
})
export class ConfigModule {}
