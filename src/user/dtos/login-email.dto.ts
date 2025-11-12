import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
