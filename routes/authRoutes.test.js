const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('authRoutes', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST, /api/register', () => {
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should return status code 201 Created when request is successful', async () => {
      const user = { username: 'Test1', password: 'password1', email: 'test1@email.com' };
      const response = await request(server).post('/api/register').send(user);

      expect(response.status).toBe(201)
    });
    it('should return the newly created user when request is successful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test1@email.com' };
      const res = await request(server).post("/api/register").send(newUser);
      const user = JSON.parse(res.text);
      expect(user.id).toBe(1);
      expect(user.username).toBe(newUser.username);
    });
    it('should return status code 400 Bad Request if username is missing', async() => {
      const newUser = { username: '', password: 'password', email: 'test@email.com' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if password is missing', async() => {
      const newUser = { username: 'Test', password: '', email: 'test@email.com' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if email is missing', async() => {
      const newUser = { username: 'Test', password: 'password', email: '' };
      const response = await request(server).post('/api/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return JSON', async() => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      const res = await request(server).post('/api/register').send(newUser);
      expect(res.type).toBe('application/json');
    });
    it('should return errorMessage: "The user could not be created" if the name is already in the database', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      await request(server).post("/api/register").send(newUser);

      return request(server).post("/api/register").send(newUser)
        .then(response => {
          expect(response.body.errorMessage).toEqual('The user could not be created.');
        });
    });
    it('should return 500 if the request is unsuccessful', async () => {
      const newUser = { username: 'Test1', password: 'password1', email: 'test@email.com' };
      await request(server).post("/api/register").send(newUser);

      return request(server).post("/api/register").send(newUser)
        .then(response => {
          expect(response.status).toBe(500);
        });
    })
  });
