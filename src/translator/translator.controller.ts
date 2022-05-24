import { Body, Controller, Post } from '@nestjs/common';
import { FileHandlerService } from '../file-handler/file-handler.service';
import { createTranslateDto } from './dto/create-translate.dto';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(
    private readonly translatorService: TranslatorService,
    private readonly fileHandlerService: FileHandlerService,
  ) {}

  @Post()
  async translate(@Body() body: createTranslateDto) {
    return await this.translatorService.getTranslatedData(body);
  }
}
