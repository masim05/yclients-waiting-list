import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO to return User type
  async validateUser(email: string, _: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      return user;
    }
    return null;
  }

  // TODO to use User type
  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
