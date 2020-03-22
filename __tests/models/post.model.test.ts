import MongoConnection from '../../src/utils/mongo-connection';
import PostModel from '../../src/models/post.model';

const sampleValidPost = { title: 'Homo Deus', author: 'Yuval Noah Harari' };
const sampleInvalidPost = { title: 'Homo Deus' };

describe('test post model', () => {
  const mongoConnection = new MongoConnection(process.env.MONGO_URL);
  beforeAll(async () => {
    mongoConnection.connect(() => {
    });
  });
  afterAll(async () => {
    mongoConnection.close((err) => {
      if (err) {
        console.error('Error shutting closing mongo connection', err);
      }
    });
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
