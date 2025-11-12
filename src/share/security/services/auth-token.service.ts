import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessJwtPayload } from 'src/types/payload.type';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signToken(payload: AccessJwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<AccessJwtPayload> {
    return this.jwtService.verifyAsync<AccessJwtPayload>(token);
  }
}
