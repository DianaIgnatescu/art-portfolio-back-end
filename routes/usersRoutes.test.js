const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('usersRoutes', () => {

  let token;
  beforeAll(async () => {
    const admin = {username: 'admin', password: 'admin', email: 'admin@email.com'};
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
    it('should return a list of users', async () => {

    });
    it('should return an empty array even when there are no users', async () => {
      const result = await request(server).get('/api/users').set('Authorization', token).expect([]);
    });
  });

  xdescribe('GET /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {

    });
    it('should return the correct response body', () =>{

    });
    it('should return 404 if user with a specific id does not exist', async () => {

    });
  });

  xdescribe('DELETE /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {

    });

    it('should return 404 if user with a specific id does not exist', async () => {

    });
  });

  xdescribe('PUT /api/users/:id', () => {
    afterEach(async () => {
      await db('users').truncate();
    });
    it('should return status code 200 when request is successful', async () => {

    });

    it('should return 404 if user with a specific id does not exist', async () => {

    });
  });

});
