import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { FileHandlerService } from 'src/file-handler/file-handler.service';
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
    const objectToTranslate = JSON.parse(
      await this.fileHandlerService.readFile('texts', 'pl.json'),
    );
    return await this.translatorService.getTranslatedData(
      body,
      objectToTranslate,
    );
  }
}
