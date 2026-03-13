// src/modules/comments/dto/comment-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CommentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Bu video juda zo\'r!' })
  content: string;

  @ApiProperty({ example: 0 })
  likesCount: number;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: 1 })
  authorId: number;

  @ApiProperty({ example: 1 })
  videoId: number;

  @ApiProperty({ 
    example: { id: 1, username: 'john_doe', email: 'john@example.com' },
    description: 'Comment muallifi (ixtiyoriy)'
  })
  author?: {
    id: number;
    username: string;
    email: string;
  };

  @ApiProperty({ example: 5 })
  _count?: {
    likes: number;
  };
}