export const ERROR_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
