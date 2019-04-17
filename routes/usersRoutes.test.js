const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('usersRoutes', () => {
  let token;
  beforeAll(async () => {
    const admin = { username: 'admin', password: 'admin', email: 'admin@email.com' };
    await request(server).post('/api/register').send(admin);
    const res = await request(server).post('/api/login').send({ username: admin.username, password: admin.password });
    token = JSON.parse(res.text).token;
  });

  describe('GET /api/users', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {
      const res = await request(server).get('/api/users').set('Authorization', token);
      expect(res.status).toBe(200);
    });
    it('should return the correct number of users stored in the database', async () => {
      const response = await request(server).get('/api/users').set('Authorization', token);
      expect(response.body.length).toBe(0);
    });
    it('should return an empty array even when there are no users', async () => {
      const result = await request(server).get('/api/users').set('Authorization', token).expect([]);
    });
  });

  describe('GET /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {
      const newUser = await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      const response = await request(server).get(`/api/users/1`).set('Authorization', token);

      expect(response.status).toBe(200);
    });
    it('should return the correct response body', async () => {
      const newUser = await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      const response = await request(server).get(`/api/users/1`).set('Authorization', token);

      expect(response.body.username).toBe('test');
    });
    it('should return 404 if user with a specific id does not exist', async () => {
      await request(server).get('/api/users/72').set('Authorization', token)
        .then((response) => {
          expect(response.body.message).toEqual('The user with the specified ID does not exist.');
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {
      const newUser = { username: 'test', password: 'password', email: 'test@email.com' };
      await request(server).post('/api/register/').set('Authorization', token).send(newUser);

      return request(server).delete('/api/users/1').set('Authorization', token)
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });

    it('should return 404 if user with a specific id does not exist', async () => {
      const newUser = { username: 'test', password: 'password', email: 'test@email.com' };
      await request(server).post('/api/register/').set('Authorization', token).send(newUser);

      return request(server).delete('/api/users/19').set('Authorization', token)
        .then((response) => {
          expect(response.status).toBe(404);
        });
    });
  });

  describe('PUT /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {
      const newUser = { username: 'test', password: 'password', email: 'test@email.com' };
      await request(server).post('/api/register/').set('Authorization', token).send(newUser);

      return request(server).put('/api/users/1').set('Authorization', token).send({ username: 'test1', password: 'password', email: 'test@email.com' })
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });

    it('should return 404 if user with a specific id does not exist', async () => {
      const newUser = { username: 'test', password: 'password', email: 'test@email.com' };
      await request(server).post('/api/register/').set('Authorization', token).send(newUser);

      return request(server).put('/api/users/18').set('Authorization', token).send({ username: 'test1', password: 'password', email: 'test@email.com' })
        .then((response) => {
          expect(response.status).toBe(404);
        });
    });
  });
});
