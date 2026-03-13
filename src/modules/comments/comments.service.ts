// src/modules/comments/comments.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';


@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, authorId: number) {
    const { content, videoId } = createCommentDto;

    // Video mavjudligini tekshirish
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException('Video topilmadi');
    }

    // Comment yaratish
    const comment = await this.prisma.comment.create({
      data: {
        content,
        authorId,
        videoId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Comment muvaffaqiyatli qo\'shildi',
      data: comment,
    };
  }

  async findByVideo(videoId: number) {
    const comments = await this.prisma.comment.findMany({
      where: { videoId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: comments,
    };
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    // Commentni topish
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment topilmadi');
    }

    // Faqat o'z commentini tahrirlash mumkin
    if (comment.authorId !== userId) {
      throw new ForbiddenException('Siz faqat o\'z commentingizni tahrirlay olasiz');
    }

    // Yangilash
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: {
        content: updateCommentDto.content,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Comment muvaffaqiyatli yangilandi',
      data: updatedComment,
    };
  }

  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment topilmadi');
    }

    // Admin yoki o'zi o'chira oladi
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (comment.authorId !== userId && user?.role !== 'ADMIN') {
      throw new ForbiddenException('Siz bu commentni o\'chira olmaysiz');
    }

    await this.prisma.comment.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Comment muvaffaqiyatli o\'chirildi',
    };
  }
}