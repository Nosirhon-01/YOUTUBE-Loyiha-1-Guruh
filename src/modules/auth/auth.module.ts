import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/core/database/prisma.service';
import { EmailModule } from 'src/common/email/email.module';
import { smsService } from 'src/core/services/send.sms.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'youtubeclone',
      signOptions: {
        expiresIn: '2h',
      },
    }),
    EmailModule,
    
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, smsService],
})
export class AuthModule {}
