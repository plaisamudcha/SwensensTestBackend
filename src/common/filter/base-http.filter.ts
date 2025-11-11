import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http.exception';
import { Response } from 'express';
import { ErrorResponse } from 'src/types/response.type';

@Catch(BaseHttpException)
export class BaseHttpFilter implements ExceptionFilter {
  catch(exception: BaseHttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { errorCode, message, statusCode, detail } = exception;
    const responseBody: ErrorResponse = {
      success: false,
      statusCode,
      errorCode,
      message,
      detail
    };
    response.status(statusCode).json(responseBody);
  }
}
