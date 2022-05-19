import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TranslateLanguage } from './TranslateLanguage';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  @HttpCode(201)
  translate(@Body() body: TranslateLanguage) {
    this.translatorService.translate(body);
  }
}
