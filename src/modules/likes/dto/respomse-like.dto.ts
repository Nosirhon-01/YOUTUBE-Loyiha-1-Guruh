import { ApiProperty } from '@nestjs/swagger';
import { LikeType } from '@prisma/client';

export class LikeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: LikeType, example: 'LIKE' })
  type: LikeType;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ required: false, example: 1 })
  videoId?: number;

  @ApiProperty({ required: false, example: 1 })
  commentId?: number;

  @ApiProperty()
  user?: {
    id: number;
    username: string;
    email: string;
  };
}