import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IPost extends Document {
  /** title of the post */
  title: string;
  /** Name of the author */
  author: string;
  totalPages: bigint;
  publishDate: string;
}

interface IPostModel extends Model<IPost> { }

const schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: false },
  publishDate: { type: Date, required: false },
}, {
  timestamps:true,
});

const PostModel: IPostModel = model<IPost, IPostModel>('Post', schema);

export default PostModel;
