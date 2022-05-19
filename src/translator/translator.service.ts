import { Injectable } from '@nestjs/common';
import { GoogleConntectorService } from './google-conntector/google-conntector.service';
import { TranslateLanguage } from './TranslateLanguage';

@Injectable()
export class TranslatorService {
  private translator;
  constructor(
    private readonly googleConnectorService: GoogleConntectorService,
  ) {
    this.translator = googleConnectorService.createTranslatorService();
  }

  async translate(body: TranslateLanguage) {
    try {
      const [response] = await this.translator.translate(
        'Jak się masz',
        body.language,
      );
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
}
