import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from 'src/common/enums/role.enum';
import { UserRequest } from 'src/common/interfaces/user-request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async getAllUsers(@Req() _req: UserRequest, @Res() res: Response) {
    try {
      const data = await this.usersService.getUsers();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.getUserById(id);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.updateUser(id, body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.removeUser(id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
