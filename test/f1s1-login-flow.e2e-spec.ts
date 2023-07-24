import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { User, CreateUserDto } from '../src/users/user.entity';
import { TypeORMPGTestingModule } from './TypeORMPGTestingModule';

describe('F1S1 Login flow', () => {
  let app: INestApplication;
  let module: TestingModule;
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeORMPGTestingModule([User]),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>('UserRepository');

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('endpoint under JwtAuthGuard (eg, /profile)', () => {
    let email: string;
    let password: string;
    let access_token: string;

    beforeAll(async () => {
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

    it('should return HTTP 401 if no auth', () => {
      return request(app.getHttpServer()).get('/profile').expect(401);
    });

    it('should return access token for valid creds', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password })
        .set('Content-Type', 'application/json')
        .expect(201);

      access_token = res.body?.access_token;
      expect(access_token).toBeTruthy();
    });

    it('should return HTTP 200 for valid access token', () => {
      return request(app.getHttpServer())
        .get('/profile')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);
    });
  });
});
