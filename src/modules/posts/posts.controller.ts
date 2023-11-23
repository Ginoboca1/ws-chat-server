import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
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
import { UserRequest } from 'src/common/interfaces/user-request';

@Roles(Role.ADMIN, Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post()
  async createPost(
    @Req() req: UserRequest,
    @Body() body: PostDto,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const userName = req.user.name;
      const data = await this.postsService.createPost({
        body,
        userId,
        userName,
      });
      return res.json(data);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }

  @Get()
  async getPosts(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.getPosts(page, limit);
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
    @Req() req: UserRequest,
    @Body() body: IPost,
    @Res() res: Response,
  ) {
    try {
      const usersId = req.user.id;
      const data = await this.postsService.updatePost(usersId, id, body);
      res.status(201).json({ data });
    } catch (error) {
      throw error;
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

  @Get('/user/:userId')
  async getPostByUser(@Param('userId') userId, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostByUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  }
}
