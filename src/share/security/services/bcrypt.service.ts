import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;

  hashPassword(plain: string): Promise<string> {
    return hash(plain, this.saltRounds);
  }

  comparePassword(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
