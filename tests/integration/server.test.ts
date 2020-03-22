import request from 'supertest';
import { server, app } from '../../src/server';

jest.mock('../../src/models/post.model');

describe('Server Test', () => {
  afterAll( (done) => {
    server.close(done);
  });

  test('GET /ping should return 200', async () => {
    const response: any = await request(app).get("/api/ping");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('pong');
  });

});
