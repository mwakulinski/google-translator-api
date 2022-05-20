import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { createTranslateDto } from './dto/create-translate.dto';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  async translate(@Body() body: createTranslateDto) {
    return await this.translatorService.translate(body);
  }
}
