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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createPost(@Body() body: PostDto, @Res() res: Response) {
    try {
      const data = await this.postsService.createPost(body);
      return res.json(data);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getPosts(@Res() res: Response) {
    try {
      const data = await this.postsService.getPosts();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/id')
  async updatePost() {
    console.log(this.postsService.updatePost);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
