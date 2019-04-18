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
    it('should return status code 404 when unsuccessful', async () => {
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
      const response = await request(server).get('/api/posts/56');
      expect(response.status).toEqual(404);
    });
    it('should return the correct response body when successful', async () => {
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
      expect(response.body.postName).toEqual('Test post');
      expect(response.body.description).toEqual('This is a test');
    });
    it('should return the correct response body when unsuccessful', async () => {
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
      const response = await request(server).get('/api/posts/56');
      expect(response.body.message).toEqual('The post with the specified ID does not exist.');
    });
  });

  describe('POST, /api/posts', () => {
    afterEach(async () => {
      await db('posts').truncate();
    });
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

    it('should return the newly created post when the request is successful', async () => {
      const newPost = {
        postName: 'Test',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      const response = await request(server)
        .post('/api/posts')
        .set('Authorization', token)
        .send(newPost);
      expect(response.body).toEqual({
        id: 1,
        postName: 'Test',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      });
    });

    it('should return status code 400 when the the postName is missing ', async () => {
      const newPost = {
        postName: '',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      const response = await request(server).post('/api/posts').set('Authorization', token).send(newPost);
      expect(response.status).toEqual(400);
    });
    it('should return status code 400 when the the imageUrl is missing ', async () => {
      const newPost = {
        postName: 'Test',
        description: 'This is a test',
        imageUrl: '',
        userId: 1,
      };

      const response = await request(server).post('/api/posts').set('Authorization', token).send(newPost);
      expect(response.status).toEqual(400);
    });
    it('should return the correct response body if the information is incomplete ', async () => {
      const newPost = {
        postName: '',
        description: 'This is a test',
        imageUrl: '',
        userId: 1,
      };

      const response = await request(server).post('/api/posts').set('Authorization', token).send(newPost);
      expect(response.body.errorMessage).toEqual('Please provide information for the post.');
    });
  });

  describe('DELETE, /api/posts/:id', () => {
    // needs authorization
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
      const response = await request(server).delete('/api/posts/1').set('Authorization', token);
      expect(response.status).toEqual(200);
    });
    it('should return status code 404 when the specific ID to be deleted does not exist', async () => {
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
      const response = await request(server).delete('/api/posts/82').set('Authorization', token);
      expect(response.status).toEqual(404);
    });
    it('should return status code 401 when authorization token is missing', async () => {
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
      const response = await request(server).delete('/api/posts/1');
      expect(response.status).toEqual(401);
    });
  });

  describe('PUT, /api/posts/:id', () => {
    // needs authorization
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
      await request(server).post('/api/posts/').set('Authorization', token).send(newPost);

      return request(server).put('/api/posts/1').set('Authorization', token).send({
        postName: 'Test post2',
        description: 'This is a test2',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      })
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });
    it('should return status code 404 when the specific ID to be updated does not exist', async () => {
      const newPost = {
        postName: 'Test post',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      await request(server).post('/api/posts/').set('Authorization', token).send(newPost);

      return request(server).put('/api/posts/76').set('Authorization', token).send({
        postName: 'Test post2',
        description: 'This is a test2',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      })
        .then((response) => {
          expect(response.status).toBe(404);
        });
    });
    it('should return the newly updated post when successful', async () => {
      const newPost = {
        postName: 'Test post',
        description: 'This is a test',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      };
      await request(server).post('/api/posts/').set('Authorization', token).send(newPost);

      return request(server).put('/api/posts/1').set('Authorization', token).send({
        postName: 'Test post2',
        description: 'This is a test2',
        imageUrl: 'https://loremflickr.com/320/240',
        userId: 1,
      })
        .then((response) => {
          expect(response.body.post).toEqual({
            id: '1',
            postName: 'Test post2',
            description: 'This is a test2',
            imageUrl: 'https://loremflickr.com/320/240',
            userId: 1,
          });
        });
    });
  });

  describe('GET, /api/posts/upvotes/:postId', () => {
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
      const response = await request(server).get('/api/posts/upvotes/1');
      expect(response.status).toEqual(200);
    });
    it('should return 0 when the post has no upvotes', async () => {
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
      const response = await request(server).get('/api/posts/upvotes/1');
      expect(response.body.upvotes).toEqual(0);
    });
  });
});
