import { RoleUser } from 'src/common/constants/role.constant';

export type AccessJwtPayload = {
  sub: string;
  role: RoleUser;
};
