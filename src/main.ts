import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { BaseHttpFilter } from './common/filter/base-http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new BaseHttpFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error(
    'Failed to start application',
    err instanceof Error ? err.stack : 'Unexpected error'
  );
});
