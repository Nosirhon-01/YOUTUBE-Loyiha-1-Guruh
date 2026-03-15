import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard, RoleGuard)
    // @Roles()
    @Post('register')
    register(
        @Body() payload: RegisterDto

    ){
        return this.authService.register(payload)
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Post('login')
    login(
        @Body() payload: LoginDto

    ){
        return this.authService.login(payload)
    }
}
