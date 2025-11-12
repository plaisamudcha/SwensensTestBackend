import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { MessageResponse } from 'src/types/response.type';
import { User } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { invalidUUIDException } from 'src/common/exceptions/invalidUUID.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async createUser(data: RegisterDto): Promise<MessageResponse> {
    await this.prismaService.user.create({ data });
    return { message: 'User created successfully' };
  }
}
