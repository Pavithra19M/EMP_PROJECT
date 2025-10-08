import request from 'supertest';
import app from './server.js';

describe('GET /', () => {
  it('should respond with 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
