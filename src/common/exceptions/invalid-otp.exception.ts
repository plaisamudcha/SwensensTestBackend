import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';

export class InvalidOtpException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED;
  readonly errorCode: ErrorCode = ERROR_CODE.OTP_INVALID;

  constructor(detail?: unknown) {
    super('The provided OTP code is invalid.', detail);
  }
}
