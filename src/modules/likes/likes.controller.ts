// src/modules/likes/likes.controller.ts
import { Controller, Post, Body, UseGuards, Request, Delete, Param, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like yoki dislike qo\'shish/o\'zgartirish' })
  async create(
    @Body() createLikeDto: CreateLikeDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.likesService.toggle(createLikeDto, userId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Likeni o\'chirish' })
  async remove(
    @Body() createLikeDto: CreateLikeDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.likesService.remove(createLikeDto, userId);
  }

  @Get('video/:videoId')
  @ApiOperation({ summary: 'Video like/dislike statistikasi' })
  async getVideoStats(@Param('videoId') videoId: string) {
    return this.likesService.getVideoStats(+videoId);
  }

  @Get('comment/:commentId')
  @ApiOperation({ summary: 'Comment like/dislike statistikasi' })
  async getCommentStats(@Param('commentId') commentId: string) {
    return this.likesService.getCommentStats(+commentId);
  }

  @Get('video/:videoId/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchining video reaksiyasini olish' })
  async getUserVideoReaction(
    @Param('videoId') videoId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.likesService.getUserVideoReaction(+videoId, userId);
  }
}