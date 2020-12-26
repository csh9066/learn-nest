import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from 'src/users/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('성공시 200 status와 user array를 반환한다', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('찾는 유저가 없을 시 404 status를 반환한다', () => {
      return request(app.getHttpServer())
        .get(`/users/2123123`)
        .expect(404)
        .expect((res) => {
          expect(res.body.error).toMatch('Not Found');
        });
    });
  });
});
