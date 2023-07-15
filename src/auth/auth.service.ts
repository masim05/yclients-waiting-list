import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string): Promise<User | undefined> {
    const user = await this.usersService.findOne(email);
    return user;
  }
}