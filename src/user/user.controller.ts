import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register.dto';
import { MessageResponse, SuccessResponse } from 'src/types/response.type';
import { User } from 'generated/prisma';

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
}
