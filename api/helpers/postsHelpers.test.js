const db = require('../../data/dbConfig');
const Posts = require('../../api/helpers/postsHelpers');

xdescribe('postsHelpers', () => {
  afterEach(async () => {
    await db('posts').truncate();
  });

  describe('getPosts', () => {
    it('should return a list of all posts', async () => {
      const posts = await Posts.getPosts();
      expect(posts).toHaveLength(0);
    });
  });

  describe('getPostById', () => {
    it('should return a given post by ID', async () => {
      const newPost = Posts.addPost({ postName: 'My birthday post', description: 'My birthday', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 1 });
      const result = await Posts.getPostById(1);
      expect(result.postName).toEqual('My birthday post');
      expect(result.id).toEqual(1);
    });
  });

  describe('getPostsfromUser', () => {
    it('should return a list of all posts from a specific user', async () => {
      const newPost1 = Posts.addPost({ postName: 'My first post', description: 'My birthday', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 1 });
      const newPost2 = Posts.addPost({ postName: 'My first post', description: 'My birthday', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 2 });
      const newPost3 = Posts.addPost({ postName: 'My second post', description: 'My birthday', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 2 });
      const newPost4 = Posts.addPost({ postName: 'My second post', description: 'My birthday', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 2 });
      const result = await Posts.getPostsFromUser(2);

      expect(result).toHaveLength(3);
    });
  });
  describe('addPost', () => {
    it('should insert the given post into the database', async () => {
      const newPost = { postName: 'My post', description: 'My Adventure', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 1 };
      const post = await Posts.addPost(newPost);
      const row = await db('posts');
      expect(post.postName).toBe('My post');
      expect(row).toHaveLength(1);
    });
  });
  describe('deletePost', () => {
    it('should delete a given post from the database by its ID', async () => {
      const newPost1 = Posts.addPost({ postName: 'My first post', description: 'My post description', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 1 });
      const newPost2 = Posts.addPost({ postName: 'My second post', description: 'My post description', imageUrl: 'https://i.stack.imgur.com/GsDIl.jpg', userId: 1 });
      const result = await Posts.deletePost(1);
      const row = await db('posts');
      expect(row).toHaveLength(1);
    });
    it('should return 0 if the given ID for the post could not be found', async () => {
      const expected = 0;
      const actual = await Posts.deletePost(11);
      expect(actual).toEqual(0);
  });

  xdescribe('editPost', () => {
    it('should edit the given post', async () => {

    });
  });

  xdescribe('upvote', () => {
    it('should save a like from a specific user for a post into the database', async () => {

    });
  });
  xdescribe('downvote', () => {
    it('should remove a like from a specific user for a post from the database', async () => {

    });
  });

  xdescribe('getUpvotes', () => {
    it('should return the number of likes a post has received from the database', async () => {

    });
  });
});
});

