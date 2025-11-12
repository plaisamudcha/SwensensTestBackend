import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import {
  GENDER_USERS,
  type GenderUser
} from 'src/common/constants/gender.constant';
import { ROLE_USERS, type RoleUser } from 'src/common/constants/role.constant';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  //   @IsString()
  //   @IsOptional()
  //   password?: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  //   @IsString()
  //   @IsOptional()
  //   otp?: string;

  @Type(() => Date)
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsEnum(GENDER_USERS)
  gender: GenderUser;

  @IsEnum(ROLE_USERS)
  @IsOptional()
  role?: RoleUser;
}
