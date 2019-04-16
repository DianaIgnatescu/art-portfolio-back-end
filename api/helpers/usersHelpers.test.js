const db = require('../../data/dbConfig');
const Users = require('../../api/helpers/usersHelpers');
const Auth = require('../../api/helpers/authHelpers');

describe('usersHelpers', () => {
  afterEach(async () => {
    await db('users').truncate();
  });
  describe('getUsers', () => {
    it('should return a list of all users in the database', async () => {
      const users = await Users.getUsers();
      expect(users).toHaveLength(0);
    });
  });

  describe('getUserById', () => {
    it('should return a given user from the database by its ID',async () => {
      const newUser = Auth.registerUser({ username: 'Test', password: 'password', email: 'test@email.com' });
      const result = await Users.getUserById(1);
      expect(result.username).toEqual('Test');
      expect(result.id).toEqual(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a given user record from the the database', async() => {
      const newUser1 = Auth.registerUser({ username: 'Test1', password: 'password1', email: 'test1@email.com' });
      const newUsert2 = Auth.registerUser({ username: 'Test2', password: 'password2', email: 'test2@email.com' });
      const result = await Users.deleteUser(1);
      const row = await db('users');
      expect(row).toHaveLength(1);
    });
  });

  xdescribe('editUser', () => {
    it('should edit a given user record in the database', async () => {

    });
  });
});

