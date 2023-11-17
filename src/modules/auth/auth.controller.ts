import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Login, SignUp } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async Signup(@Body() body: SignUp, @Res() res: Response) {
    try {
      await this.authService.SignUp(body);
      res.status(200).json({ message: 'SignUp successfully' });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Post('/login')
  async Login(@Body() body: Login, @Res() res: Response) {
    try {
      const result = await this.authService.Login(body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
    }
  }
}
