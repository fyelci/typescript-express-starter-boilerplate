import request from 'supertest';
import app from '../src/app';

jest.mock('../src/post/post.model');

describe('App Test', () => {
  test('GET /random-url should return 404', (done) => {
    request(app).get('/reset')
      .expect(404, done);
  });

  test('GET /posts should return 200', (done) => {
    request(app).get('/posts').expect(200, done);
  });
});
