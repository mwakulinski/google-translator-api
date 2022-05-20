import { IsString, MinLength } from 'class-validator';

export class createTranslateDto {
  @IsString()
  @MinLength(2)
  language: string;
}
