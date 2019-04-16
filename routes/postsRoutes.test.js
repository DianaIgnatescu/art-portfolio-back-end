const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('postsRoutes', () => {
  let token;
  beforeAll(async () => {
    const admin = { username: 'admin', password: 'admin', email: 'admin@email.com' };
    await request(server).post('/api/register').send(admin);
    const res = await request(server).post('/api/login').send({ username: admin.username, password: admin.password });
    token = JSON.parse(res.text).token;
  });

  xdescribe('GET, /api/posts', () => {

  });

  xdescribe('GET, /api/posts/:id', () => {

  });

  xdescribe('POST, /api/posts', () => {
    // needs authorization
  });

  xdescribe('DELETE, /api/posts/:id', () => {
    // needs authorization
  });

  xdescribe('PUT, /api/posts/:id', () => {
    // needs authorization
  });

  xdescribe('GET, /api/posts/upvotes/:postId', () => {

  });


  xdescribe('PUT, /api/posts/upvote/:postId/:userId', () => {
    // needs authorization
  });

  xdescribe('PUT, /api/posts/downvote/:postId/:userId', () => {
    // needs authorization
  });
});
