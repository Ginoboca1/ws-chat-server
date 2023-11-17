import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ValidateToken } from '../jwt/jwt.validate';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly validateJwt: ValidateToken) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.validateJwt.validateToken(authToken);
      request.decodedData = resp;
      request['user'] = resp;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
