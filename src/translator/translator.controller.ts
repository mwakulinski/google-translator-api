import { Body, Controller, Post } from '@nestjs/common';
import { CONSTS } from '../CONSTS';
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
    const objectToTranslate = JSON.parse(
      await this.fileHandlerService.readFile(
        CONSTS.TEXTS_DIR,
        CONSTS.FILE_TO_READ,
      ),
    );
    return await this.translatorService.getTranslatedData(
      body,
      objectToTranslate,
    );
  }
}
