import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: [String], required: true })
  autors: string[];
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: [String], required: true })
  categories: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
