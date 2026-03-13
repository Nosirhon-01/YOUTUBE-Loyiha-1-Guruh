import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, ValidateIf, Min } from 'class-validator';
import { LikeType } from '@prisma/client';

export class CreateLikeDto {
  @ApiProperty({ 
    example: 'LIKE',
    description: 'Like turi (LIKE yoki DISLIKE)'
  })
  @IsEnum(LikeType)
  type: LikeType;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'Video ID butun son bo\'lishi kerak' })
  @Min(1)
  videoId?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({ message: 'Comment ID butun son bo\'lishi kerak' })
  @Min(1)
  commentId?: number;

  // Video yoki comment dan faqat bittasi bo'lishi kerak
  @ValidateIf(o => !o.videoId && !o.commentId)
  validateOneOf() {
    if (!this.videoId && !this.commentId) {
      throw new Error('Video ID yoki Comment ID dan biri kiritilishi kerak');
    }
    if (this.videoId && this.commentId) {
      throw new Error('Faqat video YOKI comment uchun like qo\'shish mumkin');
    }
    return true;
  }
}