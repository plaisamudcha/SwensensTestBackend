export const GENDER_USERS = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
} as const;

export type GenderUser = (typeof GENDER_USERS)[keyof typeof GENDER_USERS];
