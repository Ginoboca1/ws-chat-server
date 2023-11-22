import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './models/post.schema';
import { IPost } from '../../common/interfaces/post';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async createPost(body: IPost) {
    const { title, authors, content, categories } = body;
    const postCreated = await this.postModel.create({
      title,
      authors,
      content,
      categories,
    });
    if (!postCreated) {
      throw new NotFoundException();
    }
    return { message: 'Post created successfully' };
  }
  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find();
    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts here');
    }
    return posts;
  }
  async getPostById(id: string) {
    const post = await this.postModel.findById(id).lean().exec();
    if (!post) {
      throw new NotFoundException('User not founded');
    }
    return post;
  }
  async updatePost(id: string, body: IPost): Promise<string> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, body).lean();
    if (!updatedPost) {
      throw new NotFoundException('Post not founded');
    }
    return 'Post updated successfully';
  }
  async deletePost(id: string): Promise<object> {
    const postDeleted = await this.postModel.findByIdAndDelete(id);
    if (!postDeleted) {
      throw new NotFoundException('Post not founded');
    }
    return { message: 'Post deleted successfully' };
  }
}
