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

  describe('GET, /api/posts', () => {
    afterEach(async () => {
      await db('posts').truncate();
    });

    it('should return status code 200 when request is successful', async () => {
      const res = await request(server).get('/api/posts').set('Authorization', token);
      expect(res.status).toBe(200);
    });
    it('should return the correct number of posts stored in the database', async () => {
      const response = await request(server).get('/api/posts').set('Authorization', token);
      expect(response.body.length).toBe(0);
    });
    it('should return an empty array even when there are no posts', async () => {
      const result = await request(server).get('/api/posts').set('Authorization', token);
      expect(JSON.parse(result.text)).toEqual([]);
    });
  });

  describe('GET, /api/posts/:id', () => {
    afterEach(async () => {
      await db('posts').truncate();
    });
    it('should return status code 200 when request is successful', async () => {
      const newPost = {
        postName: 'Test post',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      const firstResponse = await request(server)
        .post('/api/posts')
        .send(newPost)
        .set('Authorization', token);
      const response = await request(server).get('/api/posts/1');
      expect(response.status).toEqual(200);
    });
    // it('should return the correct response body');
  });

  describe('POST, /api/posts', () => {
    // needs authorization
    it('should return status code 201 when request is successful', async () => {
      const newPost = {
        postName: 'Test post',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      const response = await request(server).post('/api/posts').set('Authorization', token).send(newPost);
      expect(response.status).toEqual(201);
    });
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
