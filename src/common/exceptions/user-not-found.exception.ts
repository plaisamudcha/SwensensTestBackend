import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from './base-http.exception';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';

export class UserNotFoundException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.NOT_FOUND;
  readonly errorCode: ErrorCode = ERROR_CODE.USER_NOT_FOUND;

  constructor(detail?: unknown) {
    super('User not found', detail);
  }
}
