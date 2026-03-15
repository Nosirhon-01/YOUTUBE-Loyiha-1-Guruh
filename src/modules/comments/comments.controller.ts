import { Controller, Post, Body, UseGuards, Request, Get, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles';


@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
//   @Roles()
  @ApiOperation({ summary: 'Yangi comment yaratish' })
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.commentsService.create(createCommentDto, userId);
  }

  @Get('video/:videoId')
  @ApiOperation({ summary: 'Video bo\'yicha commentlarni olish' })
  async findByVideo(
    @Param('videoId') videoId: number) {
    return this.commentsService.findByVideo(videoId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Commentni tahrirlash' })
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.commentsService.update(id, updateCommentDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: `Commentni o'chirish` })
  async remove(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.commentsService.remove(id, userId);
  }
}