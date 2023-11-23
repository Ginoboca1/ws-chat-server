import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/models/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  author?: string;
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: [String], required: true })
  categories: string[];
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
