import mockingoose from 'mockingoose';
import PostModel from '../../src/post/post.model';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      title: 'name',
      author: 'author',
    };

    mockingoose(PostModel).toReturn(_doc, 'findOne');

    return PostModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

});
