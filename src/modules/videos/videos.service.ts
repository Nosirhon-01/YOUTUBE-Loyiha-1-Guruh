import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async getAllVideos(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const videos = await this.prisma.video.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    const total = await this.prisma.video.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data: videos,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async searchVideos(query: string) {
    return this.prisma.video.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async createVideo(createVideoDto: CreateVideoDto, userId: number) {
    return this.prisma.video.create({
      data: {
        ...createVideoDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async incrementViewCount(videoId: number) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return this.prisma.video.update({
      where: { id: videoId },
      data: {
        viewsCount: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async getVideoById(videoId: number) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }
}
