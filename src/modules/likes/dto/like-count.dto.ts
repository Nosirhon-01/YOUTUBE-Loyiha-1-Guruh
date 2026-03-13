import { ApiProperty } from '@nestjs/swagger';

export class LikeCountDto {
  @ApiProperty({ example: 10, description: 'Like lar soni' })
  likes: number;

  @ApiProperty({ example: 2, description: 'Dislike lar soni' })
  dislikes: number;

  @ApiProperty({ example: 12, description: 'Jami reaksiyalar' })
  total: number;

  @ApiProperty({ example: 8, description: 'Foydalanuvchi reaksiyasi (agar mavjud bo\'lsa)' })
  userReaction?: 'LIKE' | 'DISLIKE' | null;
}