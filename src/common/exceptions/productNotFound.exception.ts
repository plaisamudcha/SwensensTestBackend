import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE, ErrorCode } from '../constants/error-code.constant';
import { BaseHttpException } from './base-http.exception';

export class ProductNotFoundException extends BaseHttpException {
  readonly statusCode: HttpStatus = HttpStatus.NOT_FOUND;
  readonly errorCode: ErrorCode = ERROR_CODE.PRODUCT_NOT_FOUND;

  constructor(detail?: unknown) {
    super('Product not found', detail);
  }
}
