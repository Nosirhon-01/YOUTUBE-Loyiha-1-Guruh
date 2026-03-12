import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  url: string;
}
