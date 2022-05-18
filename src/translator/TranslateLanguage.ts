import { IsString, MinLength } from 'class-validator';

export class TranslateLanguage {
  @IsString()
  @MinLength(2)
  language: string;
}
