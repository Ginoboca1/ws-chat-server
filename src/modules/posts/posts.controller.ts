import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Response } from 'express';
import { PostDto } from './dto/post';
import { IPost } from 'src/common/interfaces/post';

@Roles(Role.ADMIN, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  async createPost(@Body() body: PostDto, @Res() res: Response) {
    try {
      const data = await this.postsService.createPost(body);
      return res.json(data);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  @Get()
  async getPosts(@Res() res: Response) {
    try {
      const data = await this.postsService.getPosts();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostById(id);
      return res.status(200).json({ data });
    } catch (error) {
      console.log('error', error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: IPost,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.updatePost(id, body);
      res.status(201).json({ data });
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.postsService.deletePost(id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
