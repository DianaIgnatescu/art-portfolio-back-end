const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('authRoutes', () => {
  let token;
  beforeAll(async () => {
    const testUser = { username: 'test', password: 'test', email: 'test@email.com' };
    await request(server).post('/api/register').send(testUser);
    const res = await request(server).post('/api/login').send({ username: testUser.username, password: testUser.password });
    token = JSON.parse(res.text).token;
  });

  afterAll(async () => {
    db.destroy();
  });

  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST, /api/register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should return status code 201 Created when request is successful', async () => {
      const user = { username: 'Test1', password: 'password1', email: 'test1@email.com' };
      const response = await request(server).post('/api/register').send(user);

      expect(response.status).toBe(201);
    });
    it('should return the newly created user when request is successful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test1@email.com' };
      const res = await request(server).post('/api/register').send(newUser);
      const user = JSON.parse(res.text);
      expect(user.id).toBe(1);
      expect(user.username).toBe(newUser.username);
    });
    it('should return status code 400 Bad Request if username is missing', async () => {
      const newUser = { username: '', password: 'password', email: 'test@email.com' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if password is missing', async () => {
      const newUser = { username: 'Test', password: '', email: 'test@email.com' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if email is missing', async () => {
      const newUser = { username: 'Test', password: 'password', email: '' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return JSON', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      const res = await request(server).post('/api/register').send(newUser);
      expect(res.type).toBe('application/json');
    });
    it('should return errorMessage: "The user could not be created" if the name is already in the database', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      await request(server).post('/api/register').send(newUser);

      await request(server).post('/api/register').send(newUser)
        .then((response) => {
          expect(response.body.errorMessage).toEqual('The user could not be created.');
        });
    });
    it('should return 500 if the request is unsuccessful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      await request(server).post('/api/register').send(newUser);

      await request(server).post('/api/register').send({ username: 'Test1', password: 'password1', email: 'test@email.com' })
        .then((response) => {
          expect(response.status).toBe(500);
          expect(response.body.errorMessage).toBe('The user could not be created.');
        });
    });
  });

  describe('POST, /api/login', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should return status code 200 OK when request is successful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      const response = await request(server).post('/api/login').set('Authorization', token).send({ username: newUser.username, password: newUser.password });
      expect(response.status).toBe(200);
    });
    it('should return JSON', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      const response = await request(server).post('/api/login').send({ username: newUser.username, password: newUser.password });
      expect(response.type).toBe('application/json');
    });
    it('should return a token when the request is successful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      await request(server).post('/api/register').send(newUser);

      return request(server).post('/api/login').send({ username: newUser.username, password: newUser.password })
        .then((response) => {
          expect(response.body.token).toBeTruthy();
        });
    });
    it('should return status code 400 Bad Request if username is missing', async () => {
      const newUser = { username: '', password: 'password' };
      const response = await request(server).post('/api/login').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if password is missing', async () => {
      const newUser = { username: 'Test', password: '' };
      const response = await request(server).post('/api/login').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return errorMessage: "Missing username or password." if username is missing', async () => {
      const newUser = { username: '', password: 'password1', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);

      return request(server).post('/api/login').send(newUser)
        .then((response) => {
          expect(response.body.errorMessage).toEqual('Missing username or password.');
        });
    });
    it('should return errorMessage: "Missing username or password." if password is missing', async () => {
      const newUser = { username: 'Test', password: '', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);

      return request(server).post('/api/login').send(newUser)
        .then((response) => {
          expect(response.body.errorMessage).toEqual('Missing username or password.');
        });
    });
    it('should return status code 401 Bad Request if username is incorrect', async () => {
      const newUser = { username: 'Test', password: 'password', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      const response = await request(server).post('/api/login').send({ username: 'IncorrectUsername', password: newUser.password });
      expect(response.status).toBe(401);
    });
    it('should return errorMessage if username is incorrect', async () => {
      const newUser = { username: 'Test', password: 'password', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      return request(server).post('/api/login').send({ username: 'IncorrectUsername', password: newUser.password })
        .then((response) => {
          expect(response.body.message).toEqual('Invalid credentials.');
        });
    });
    it('should return status code 401 Bad Request if password is incorrect', async () => {
      const newUser = { username: 'Test', password: 'password', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      const response = await request(server).post('/api/login').send({ username: newUser.username, password: 'notPassword' });
      expect(response.status).toBe(401);
    });
    it('should return errorMessage: "Invalid credentials." if password is incorrect', async () => {
      const newUser = { username: 'Test', password: 'password', email: 'test@email.com' };
      const user = await request(server).post('/api/register').send(newUser);
      return request(server).post('/api/login').send({ username: newUser.username, password: 'notPassword' })
        .then((response) => {
          expect(response.body.message).toEqual('Invalid credentials.');
        });
    });
  });
});
