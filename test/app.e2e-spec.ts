import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setMainConfig } from '../src/main.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setMainConfig(app);
    await app.init();
  });

  describe('/translator [POST]', () => {
    it('properly sends request to endpoint', async () => {
      const { body: response, status: status } = await request(
        app.getHttpServer(),
      )
        .post('/translator')
        .send({ language: 'en' });

      expect(status).toBe(201);
    });

    it('throws error when inappropriate data send', async () => {
      const { body: response, status: status } = await request(
        app.getHttpServer(),
      )
        .post('/translator')
        .send({ language: 123 });

      expect(status).toBe(400);
      expect(response).toEqual({
        error: 'Bad Request',
        message: [
          'language must be longer than or equal to 2 characters',
          'language must be a string',
        ],
        statusCode: 400,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
