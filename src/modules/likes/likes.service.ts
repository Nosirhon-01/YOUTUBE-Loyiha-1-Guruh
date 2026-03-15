import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async toggle(createLikeDto: CreateLikeDto, userId: number) {
    const { type, videoId, commentId } = createLikeDto;

    // Video yoki comment mavjudligini tekshirish
    if (videoId) {
      const video = await this.prisma.video.findUnique({
        where: { id: videoId },
      });
      if (!video) {
        throw new NotFoundException('Video topilmadi');
      }
    }

    if (commentId) {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        throw new NotFoundException('Comment topilmadi');
      }
    }

    // Mavjud likeni tekshirish
    const existingLike = await this.prisma.like.findFirst({
      where: {
        userId,
        ...(videoId ? { videoId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });

    if (existingLike) {
      if (existingLike.type === type) {
        // Agar bir xil type bo'lsa - o'chirish (toggle)
        await this.prisma.like.delete({
          where: { id: existingLike.id },
        });

        // Comment likesCount ni yangilash
        if (commentId) {
          await this.updateCommentLikesCount(commentId);
        }

        return {
          success: true,
          message: 'Like olib tashlandi',
          action: 'removed',
        };
      } else {
        // Type o'zgargan bo'lsa - yangilash
        const updated = await this.prisma.like.update({
          where: { id: existingLike.id },
          data: { type },
        });

        // Comment likesCount ni yangilash
        if (commentId) {
          await this.updateCommentLikesCount(commentId);
        }

        return {
          success: true,
          message: `${type} qo'yildi`,
          action: 'updated',
          data: updated,
        };
      }
    }

    // Yangi like yaratish
    const like = await this.prisma.like.create({
      data: {
        type,
        userId,
        ...(videoId ? { videoId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });

    // Comment likesCount ni yangilash
    if (commentId) {
      await this.updateCommentLikesCount(commentId);
    }

    return {
      success: true,
      message: `${type} qo'yildi`,
      action: 'created',
      data: like,
    };
  }

  async remove(createLikeDto: CreateLikeDto, userId: number) {
    const { videoId, commentId } = createLikeDto;

    const like = await this.prisma.like.findFirst({
      where: {
        userId,
        ...(videoId ? { videoId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });

    if (!like) {
      throw new BadRequestException('Like topilmadi');
    }

    await this.prisma.like.delete({
      where: { id: like.id },
    });

    // Comment likesCount ni yangilash
    if (commentId) {
      await this.updateCommentLikesCount(commentId);
    }

    return {
      success: true,
      message: 'Like o\'chirildi',
    };
  }

  async getVideoStats(videoId: number) {
    const [likes, dislikes] = await Promise.all([
      this.prisma.like.count({
        where: { videoId, type: 'LIKE' },
      }),
      this.prisma.like.count({
        where: { videoId, type: 'DISLIKE' },
      }),
    ]);

    return {
      success: true,
      data: {
        likes,
        dislikes,
        total: likes + dislikes,
        rating: likes - dislikes,
      },
    };
  }

  async getCommentStats(commentId: number) {
    const [likes, dislikes] = await Promise.all([
      this.prisma.like.count({
        where: { commentId, type: 'LIKE' },
      }),
      this.prisma.like.count({
        where: { commentId, type: 'DISLIKE' },
      }),
    ]);

    return {
      success: true,
      data: {
        likes,
        dislikes,
        total: likes + dislikes,
      },
    };
  }

  async getUserVideoReaction(videoId: number, userId: number) {
    const like = await this.prisma.like.findFirst({
      where: {
        videoId,
        userId,
      },
    });

    return {
      success: true,
      data: like?.type || null,
    };
  }

  private async updateCommentLikesCount(commentId: number) {
    const likesCount = await this.prisma.like.count({
      where: { commentId, type: 'LIKE' },
    });

    await this.prisma.comment.update({
      where: { id: commentId },
      data: { likesCount },
    });
  }
}