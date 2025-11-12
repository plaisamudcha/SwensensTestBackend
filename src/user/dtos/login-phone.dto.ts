import { PickType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPhoneDto extends PickType(RegisterDto, ['telephone']) {}

export class VerifyOtpDto extends PickType(RegisterDto, ['telephone']) {
  @IsString()
  @IsNotEmpty()
  otpCode: string;
}
