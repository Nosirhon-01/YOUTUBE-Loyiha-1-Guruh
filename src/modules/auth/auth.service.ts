import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { smsService } from 'src/core/services/send.sms.service';
import { EmailService } from 'src/common/email/email.service';
import { generateOtp } from 'src/core/utils/generate.sms.code';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private prisma: PrismaService,
    private smsService : smsService,
    private emailService : EmailService
  ) {}

  // register qilganda otp jo'natiladi emailiga to'g'ri kirgizsa keyin loginga o'tadi

  async register(payload: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.prisma.user.create({
      data: payload
    });

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    const otp = generateOtp()

    await this.emailService.sendEmail(
      payload.email,
      payload.username,
      payload.password,
      otp
    );
    return {
        success: true,
        message: "Confirmation code is sent to your phone number",
        token,
    };
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || user.password !== payload.password) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    };
  }
}
