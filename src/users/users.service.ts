import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, CreateUserDto } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .where(`email = :email AND password = crypt(:password, password)`, {
        email,
        password,
      })
      .getOne();
    return user;
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .where(`email = :email AND password = crypt(:password, password)`, {
        email,
        password,
      })
      .getOne();
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { username, email, password } = createUserDto;

    await this.usersRepository.query(
      `INSERT INTO "users" (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')));`,
      [username, email, password],
    );
    const user = await this.usersRepository
      .createQueryBuilder()
      .where({ email })
      .getOne();
    return user;
  }
}
