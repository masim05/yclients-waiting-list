import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      uuid: '45d56f88-60ef-48de-bf20-2b282faa0bd7',
      email: 'john@test.com',
      username: 'John',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: '14e8eecc-bb2a-40ab-bc4b-1fdf3caa880c',
      email: 'ned@test.com',
      username: 'Ned',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
