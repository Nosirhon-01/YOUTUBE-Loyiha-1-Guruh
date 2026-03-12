import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateVideoDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  url?: string;
}
