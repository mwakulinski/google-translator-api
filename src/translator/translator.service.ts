import { Injectable } from '@nestjs/common';
import { GoogleConntectorService } from './google-conntector/google-conntector.service';
import { createTranslateDto } from './dto/create-translate.dto';

@Injectable()
export class TranslatorService {
  private translator;
  constructor(
    private readonly googleConnectorService: GoogleConntectorService,
  ) {
    this.translator = googleConnectorService.createTranslatorService();
  }

  async translate(body: createTranslateDto) {
    try {
      const [response] = await this.translator.translate(
        'Jak się masz',
        body.language,
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
