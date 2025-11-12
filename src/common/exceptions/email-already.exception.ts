import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';

export class EmailAlreadyException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  readonly errorCode: ErrorCode = ERROR_CODE.EMAIL_ALREADY_IN_USE;

  constructor(detail?: unknown) {
    super('Email is already in use', detail);
  }
}
