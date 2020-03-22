import request from 'supertest';
import { App } from '../src/app';

jest.mock('../src/models/post.model');
const app = App.bootstrap().app;

describe('App Test', () => {
  test('GET /random-url should return 404', (done) => {
    request(app).get('/reset')
      .expect(404, done);
  });

  test('GET /posts should return 200', async () => {
    const response: any = await request(app).get("/api/posts");
    expect(response.statusCode).toBe(200);
  });

  test('POST /posts should return 201', async () => {
    const response: any = await request(app).post("/api/posts").send({foo: 'bar'});
    expect(response.statusCode).toBe(201);
  });

});
