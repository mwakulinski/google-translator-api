import { Injectable } from '@nestjs/common';
import { createTranslateDto } from '../dto/create-translate.dto';
import { v2 } from '@google-cloud/translate';

@Injectable()
export class GoogleConnectorService {
  private createTranslatorService() {
    const projectId = process.env.PROJECT_ID;
    const credentials = JSON.parse(process.env.CREDENTIALS!);
    return new v2.Translate({
      credentials,
      projectId,
    });
  }

  async translate(textToTranslate: string[], language: string) {
    const [response] = await this.createTranslatorService().translate(
      textToTranslate,
      language,
    );
    return response;
  }
}
