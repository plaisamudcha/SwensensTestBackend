import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/common/constants/error-code.constant';

export type ErrorResponse = {
  success: false;
  statusCode: HttpStatus;
  errorCode: ErrorCode;
  message: string;
  detail?: unknown;
};

export type MessageResponse = {
  message: string;
};

export type DataResponse<T> = {
  data: T;
} & MessageResponse;

export type TokenResponse = {
  accessToken: string;
};

export type PaginatedDataResponse<T> = DataResponse<T> & {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type SuccessResponse<T> = {
  success: true;
} & Partial<DataResponse<T>> &
  Partial<PaginatedDataResponse<T>>;
