import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { MessageResponse, TokenResponse } from 'src/types/response.type';
import { User } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { invalidUUIDException } from 'src/common/exceptions/invalidUUID.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { SmsService } from 'src/share/security/services/sms.service';
import { LoginEmailDto } from './dtos/login-email.dto';
import { BcryptService } from 'src/share/security/services/bcrypt.service';
import { InvalidCredentialsException } from 'src/common/exceptions/invalid-credentials.exception';
import { AuthTokenService } from 'src/share/security/services/auth-token.service';
import { EmailAlreadyException } from 'src/common/exceptions/email-already.exception';
import { PhoneAlreadyException } from 'src/common/exceptions/phone-already.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly smsService: SmsService,
    private readonly bcryptService: BcryptService,
    private readonly authTokenService: AuthTokenService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        throw new UserNotFoundException();
      }
      return user;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2023'
      ) {
        throw new invalidUUIDException();
      }
      throw err;
    }
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { telephone: phoneNumber }
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async createUser(data: RegisterDto): Promise<MessageResponse> {
    // เช็คว่า email ซ้ำหรือไม่ (ถ้ามี)
    if (data.email) {
      const existingUserByEmail = await this.prismaService.user.findUnique({
        where: { email: data.email }
      });
      if (existingUserByEmail) {
        throw new EmailAlreadyException();
      }
    }

    // เช็คว่าเบอร์โทรซ้ำหรือไม่
    const existingUserByPhone = await this.prismaService.user.findUnique({
      where: { telephone: data.telephone }
    });
    if (existingUserByPhone) {
      throw new PhoneAlreadyException();
    }

    await this.prismaService.user.create({ data });

    return { message: 'User created successfully' };
  }

  async loginUser(data: LoginEmailDto): Promise<TokenResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isValidToken = await this.bcryptService.comparePassword(
      data.password,
      user.password || ''
    );

    if (!isValidToken) {
      throw new InvalidCredentialsException();
    }

    const { id: sub, role } = user;

    const accessToken = await this.authTokenService.signToken({ sub, role });

    return { accessToken };
  }

  async sendOtpToUser(phoneNumber: string): Promise<MessageResponse> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.getUserByPhoneNumber(phoneNumber);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { otp: otpCode }
    });

    return this.smsService.sendOtp(phoneNumber, otpCode);
  }

  async verifyUserOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const user = await this.getUserByPhoneNumber(phoneNumber);

    const isValid = user.otp === otpCode;

    if (isValid) {
      // ลบ OTP หลังจาก verify สำเร็จ
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { otp: null }
      });
    }

    return isValid;
  }
}
