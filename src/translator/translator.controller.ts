import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TranslateLanguage } from './TranslateLanguage';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  async translate(@Body() body: TranslateLanguage) {
    return await this.translatorService.translate(body);
  }
}
