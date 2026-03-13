import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ 
    description: 'Comment matni',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ 
    description: 'Video ID',
  })
  @IsInt({ message: 'Video ID butun son bo\'lishi kerak' })
  @Min(1, { message: 'Video ID 1 dan kichik bo\'lmasligi kerak' })
  videoId: number;

  // authorId odatda tokendan olinadi, DTO ga kirmaydi!
}