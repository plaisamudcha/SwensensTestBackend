import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';

export class InvalidCredentialsException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.INVALID_CREDENTIALS;

  constructor(detail?: unknown) {
    super('Invalid credentials provided', detail);
  }
}
