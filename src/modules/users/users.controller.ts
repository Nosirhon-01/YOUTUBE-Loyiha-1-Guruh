import { Controller, Get, UseGuards, Request, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: Request) {
    console.log(req);
    
    // return this.usersService.getUserById(req.user.id);
  }
}
