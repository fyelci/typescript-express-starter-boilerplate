import MongoConnection from '../../../src/utils/mongo-connection';
import { createPost, updatePost, getPosts, deletePostById } from '../../../src/repositories/post.repository';
import PostModel from '../../../src/models/post.model';

const sampleValidPost1 = { title: 'Homo Deus', detail: 'Sample Detail', pictureUrl: 'url', author: 'Yuval Noah Harari' };
const sampleValidPost2 = { title: 'Sample Title', detail: 'Sample Detail 2', pictureUrl: 'url2', author: 'Fatih' };

describe('post repository test', () => {
    const mongoConnection = new MongoConnection(process.env.MONGO_URL);
    beforeAll(async () => {
        mongoConnection.connect(() => {
        });
    });
    afterAll(async (done) => {
        mongoConnection.close((err) => {
            if (err) console.error('Error shutting closing mongo connection', err);
            done();
        });
    });

    describe('Create Post', () => {
        test('should create post', async () => {
            const savedPost = await createPost(sampleValidPost1);

            expect(savedPost._id).toBeDefined();
            expect(savedPost.title).toBe(sampleValidPost1.title);
            expect(savedPost.author).toBe(sampleValidPost1.author);
            expect(savedPost.createdAt).toBeDefined();
        });
    });

    describe('Update Post', () => {
        const updateFields = { title: 'Updated Title', author: 'Updated Author' };
        test('should update post', async () => {
            const post = new PostModel(sampleValidPost1);
            await post.save();

            await updatePost(post.id, updateFields);

            const updatedPost = await PostModel.findById(post.id).exec();

            expect(updatedPost.title).toBe(updateFields.title);
        });
    });

    describe('List Posts', () => {
        beforeEach(async () => {
            const post1 = new PostModel(sampleValidPost1);
            const post2 = new PostModel(sampleValidPost2);
            await post1.save();
            await post2.save();
        });

        test('should get posts after create', async () => {
            const resultByTitle = await getPosts({title: 'sample'});
            const resultByAuthor = await getPosts({author: 'Fatih'});

            expect(resultByTitle.length).toBe(1);
            expect(resultByAuthor.length).toBe(1);
        });
    });

    describe('Delete Post', () => {
        test('should delete post', async () => {
            const post = new PostModel(sampleValidPost1);
            await post.save();

            await deletePostById(post._id);

            const deletedPost = await PostModel.findById(post._id);
            expect(deletedPost).toBeNull();
        });
    });
});
