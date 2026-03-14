import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterError } from 'multer';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UploadVideoDto } from './dto/upload-video.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  async getAllVideos(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.videosService.getAllVideos(parseInt(page), parseInt(limit));
  }

  @Get('search')
  async searchVideos(@Query('q') query: string) {
    if (!query) {
      throw new BadRequestException('Search query is required');
    }
    return this.videosService.searchVideos(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVideo(@Body() createVideoDto: CreateVideoDto, @Request() req) {
    return this.videosService.createVideo(createVideoDto, req.user.id);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: 'uploads/videos',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadVideo(
    @UploadedFile() file: any,
    @Body() uploadVideoDto: UploadVideoDto,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('Video file is required');
    }
    return this.videosService.uploadVideo(file, uploadVideoDto, req.user.id);
  }

  @Post(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.videosService.incrementViewCount(parseInt(id));
  }

  @Get(':id')
  async getVideoById(@Param('id') id: string) {
    return this.videosService.getVideoById(parseInt(id));
  }
}
