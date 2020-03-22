import request from 'supertest';
import app from '../src/app';

jest.mock('../src/models/post.model');

describe('App Test', () => {
  test('GET /random-url should return 404', (done) => {
    request(app).get('/reset')
      .expect(404, done);
  });

  test('GET /posts should return 200', async () => {
    const response: any = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
  });

  test('POST /posts should return 201', async () => {
    const response: any = await request(app).post("/posts").send({foo: 'bar'});
    expect(response.statusCode).toBe(201);
  });

});
