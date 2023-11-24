import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/models/user.schema';
import { Post } from '../posts/models/post.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getAdmins(): Promise<User[]> {
    const admins = await this.userModel
      .find({ role: 'admin' })
      .select('-password')
      .lean()
      .exec();
    if (!admins || admins.length === 0) {
      throw new NotFoundException('There are no admins here');
    }
    return admins;
  }

  async getAdminsPosts(): Promise<Post[]> {
    // Obtén todos los posts cuyo userId pertenezca a un usuario con rol de admin
    const admins = await this.postModel
      .find() // Asegúrate de que el campo 'user' sea la referencia correcta en tu modelo de post
      .exec();

    return admins;
  }
}
