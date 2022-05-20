import { Injectable } from '@nestjs/common';
import { GoogleConntectorService } from './google-conntector/google-conntector.service';
import { createTranslateDto } from './dto/create-translate.dto';
import { FileHandlerService } from '../file-handler/file-handler.service';
const path = require('path');

@Injectable()
export class TranslatorService {
  private translator;
  constructor(
    private readonly googleConnectorService: GoogleConntectorService,
    private readonly fileHandlerService: FileHandlerService,
  ) {
    this.translator = googleConnectorService.createTranslatorService();
  }

  //TODO: add function to check if given data is an object, if so parse it into array of strings

  async translate(body: createTranslateDto) {
    try {
      if (
        this.fileHandlerService.checkIfExist(
          path.resolve('texts', `${body.language}.json`),
        )
      ) {
        return this.fileHandlerService.readFile(
          'texts',
          `${body.language}.json`,
        );
      }

      const [response] = await this.translator.translate(
        ['Jak się masz', 'Dobrze bobrze', ['czy to zadziała?']],
        body.language,
      );

      await this.fileHandlerService.writeToFile(
        'texts',
        `${body.language}.json`,
        response,
      );

      return response;
    } catch (error) {
      return error;
    }
  }
}
