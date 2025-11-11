import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const details: Record<string, string[]> = {};
        errors.forEach((err) => {
          details[err.property] = Object.values(err.constraints ?? {});
        });
        throw new ValidationException(details);
      }
    });
  }
}
