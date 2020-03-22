const mongoose = require('mongoose');
import PostModel from '../../src/post/post.model';

const sampleValidPost = { title: 'Homo Deus', author: 'Yuval Noah Harari' };
const sampleInvalidPost = { title: 'Homo Deus' };

describe('test post model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {  useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err: any) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should save post', async () => {
    const post = new PostModel(sampleValidPost);
    const savedPost = await post.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedPost._id).toBeDefined();
    expect(savedPost.title).toBe(sampleValidPost.title);
    expect(savedPost.author).toBe(sampleValidPost.author);
    expect(savedPost.createdAt).toBeDefined();
  });

  test('should fail when object is invalid', async () => {
    const post = new PostModel(sampleInvalidPost);
    await expect(post.save()).rejects.toThrow('Post validation failed: author: Path `author` is required.');
  });
});
