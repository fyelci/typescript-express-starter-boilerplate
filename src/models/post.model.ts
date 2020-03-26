import {
  Document, Schema, model, SchemaTimestampsConfig
} from 'mongoose';

export interface IPost extends Document, SchemaTimestampsConfig{
  title: string;
  detail: string;
  pictureUrl: string;
  author: string;
  authorProfilePic: string;
  publishDate: string;
}

const schema = new Schema({
  title: { type: String, required: true },
  detail: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  author: { type: String, required: false },
  authorProfilePic: { type: String, required: false },
  publishDate: { type: Date, required: false },
}, {
  timestamps:true,
});

export default model<IPost>('Post', schema);
