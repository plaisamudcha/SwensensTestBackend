import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-code.constant';

export abstract class BaseHttpException extends Error {
  abstract readonly statusCode: HttpStatus;
  abstract readonly errorCode: ErrorCode;

  constructor(
    message: string,
    public readonly detail?: unknown
  ) {
    super(message);
  }
}
