import { Injectable } from '@nestjs/common';
import { TranslateLanguage } from '../TranslateLanguage';
import { v2 } from '@google-cloud/translate';

@Injectable()
export class GoogleConntectorService {
  createTranslatorService() {
    const projectId = process.env.PROJECT_ID;
    const credentials = JSON.parse(process.env.CREDENTIALS!);
    return new v2.Translate({
      credentials,
      projectId,
    });
  }
}
