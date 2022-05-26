import { Injectable } from '@nestjs/common';
import { GoogleConnector } from '../google-connector';
import { v2 } from '@google-cloud/translate';

@Injectable()
export class GoogleLibraryTranslatorService extends GoogleConnector {
  protected createTranslatorService(): v2.Translate {
    const projectId = process.env.PROJECT_ID;
    const credentials = JSON.parse(process.env.CREDENTIALS);
    return new v2.Translate({
      credentials,
      projectId,
    });
  }
  protected async translateData(textToTranslate: string[], language: string) {
    const [response] = await this.createTranslatorService().translate(
      textToTranslate,
      language,
    );
    return response;
  }
}
