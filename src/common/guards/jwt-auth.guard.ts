import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      let token = req.headers.authorization;
      console.log(req.headers.authorization);
      

      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      token = token.split(' ')[1];

      const user = this.jwtService.verify(token);

      req['user'] = user;

      return true;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}