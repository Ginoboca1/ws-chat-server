import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class PostUpdateDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsArray()
  authors?: string[];

  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsArray()
  categories?: string[];
}
