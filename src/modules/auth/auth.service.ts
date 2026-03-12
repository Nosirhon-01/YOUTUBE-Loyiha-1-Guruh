import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService : JwtService
    ){}
    async register(payload: RegisterDto){

    }

    async login(payload: RegisterDto){
        
    }
}
