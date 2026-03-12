import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, PrismaService],
})
export class VideosModule {}
