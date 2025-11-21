import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a 200 status code (GET /)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200);
  });

  it('should return the correct "Hello World" message (GET /)', async () => {
    const response = await request(app.getHttpServer())
      .get('/');

    expect(response.body.message).toBe('Hello World');
  });

  it('should return data with length 2 (GET /)', async () => {
    const response = await request(app.getHttpServer())
      .get('/');

    expect(response.body.data).toHaveLength(2);
  });
});
