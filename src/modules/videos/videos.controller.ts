import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
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

  @Post(':id/view')
  async incrementViewCount(@Param('id') id: string) {
    return this.videosService.incrementViewCount(parseInt(id));
  }

  @Get(':id')
  async getVideoById(@Param('id') id: string) {
    return this.videosService.getVideoById(parseInt(id));
  }
}
