import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleConnector } from '../google-connector';

@Injectable()
export class GoogleRestTranslatorService extends GoogleConnector {
  protected async translateData(textToTranslate: string[], language: string) {
    const key = process.env.KEY;
    let url = 'https://translation.googleapis.com/language/translate/v2';

    const response = await axios.post(
      url,
      { q: textToTranslate, target: language },
      {
        params: {
          key: key,
        },
      },
    );
    return response.data.data.translations.map(
      ({ translatedText, detectedSourceLanguage }) => {
        return translatedText;
      },
    );
  }
}
