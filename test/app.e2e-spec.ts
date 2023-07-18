import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('F1S1 Login flow', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('endpoint under JwtAuthGuard (eg, /profile)', () => {
    let access_token: string;

    it('should return HTTP 401 if no auth', () => {
      return request(app.getHttpServer()).get('/profile').expect(401);
    });

    it('should return access token for valid creds', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'john@test.com', password: 'xx' })
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
