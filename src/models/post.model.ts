import {
  Document, Schema, model, SchemaTimestampsConfig
} from 'mongoose';

export interface IPost extends Document, SchemaTimestampsConfig{
  /** title of the post */
  title: string;
  /** Name of the author */
  author: string;
  totalPages: bigint;
  publishDate: string;
}

const schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: false },
  publishDate: { type: Date, required: false },
}, {
  timestamps:true,
});

export default model<IPost>('Post', schema);
