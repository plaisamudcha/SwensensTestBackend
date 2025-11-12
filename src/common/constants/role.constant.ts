export const ROLE_USERS = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

export type RoleUser = (typeof ROLE_USERS)[keyof typeof ROLE_USERS];
