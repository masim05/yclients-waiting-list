import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../src/users/users.service';
import { User, CreateUserDto } from '../src/users/user.entity';
import { TypeORMPGTestingModule } from './TypeORMPGTestingModule';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeORMPGTestingModule([User]),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>('UserRepository');
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    beforeEach(async () => {
      await repository.clear();
    });

    it('should be able to create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test_username',
        email: 'email@test.com',
        password: '111',
      };
      const user = await service.create(createUserDto);

      expect(user).toBeDefined();
      expect(user?.username).toEqual(createUserDto.username);
      expect(user?.email).toEqual(createUserDto.email);
    });
  });

  describe('login', () => {
    let email: string;
    let password: string;

    beforeEach(async () => {
      await repository.clear();

      email = `${Date.now()}@test.com`;
      password = Date.now().toString();
      const createUserDto: CreateUserDto = {
        username: 'test_username',
        email,
        password,
      };
      await service.create(createUserDto);
    });

    it('should be able to login a user', async () => {
      const user = await service.validate(email, password);

      expect(user).toBeDefined();
      expect(user?.email).toEqual(email);
    });
  });
});
