import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';

export class ValidationException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  readonly errorCode: ErrorCode = ERROR_CODE.VALIDATION_ERROR;

  constructor(detail: unknown) {
    super('Validation failed', detail);
  }
}
