import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SignUp } from './dto/auth-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRequest } from 'src/common/interfaces/user-request';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async Signup(@Body() body: SignUp, @Res() res: Response) {
    try {
      await this.authService.SignUp(body);
      res.status(200).json({ message: 'SignUp successfully' });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async Login(@Req() req: UserRequest, @Res() res: Response) {
    try {
      const result = await this.authService.Login(req.user);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Post('/:token')
  async DecodeToken(@Param('token') token: string, @Res() res: Response) {
    try {
      const result = await this.authService.DecodedToken(token);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }
}
