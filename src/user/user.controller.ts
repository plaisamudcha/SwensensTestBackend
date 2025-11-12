import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { MessageResponse, SuccessResponse } from 'src/types/response.type';
import { User } from 'generated/prisma';
import { LoginPhoneDto, VerifyOtpDto } from './dtos/login-phone.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<SuccessResponse<User[]>> {
    const users = await this.userService.getAllUsers();
    return {
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    };
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string
  ): Promise<SuccessResponse<User | null>> {
    const user = await this.userService.getUserById(id);
    return {
      success: true,
      data: user,
      message: 'User retrieved successfully'
    };
  }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<MessageResponse> {
    return this.userService.createUser(body);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: LoginPhoneDto): Promise<MessageResponse> {
    return this.userService.sendOtpToUser(body.telephone);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto): Promise<MessageResponse> {
    const { telephone, otpCode } = body;
    const isValid = await this.userService.verifyUserOtp(telephone, otpCode);

    if (isValid) {
      return { message: 'OTP verified successfully' };
    } else {
      return { message: 'Invalid OTP' };
    }
  }
}
