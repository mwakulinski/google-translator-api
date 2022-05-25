import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleConnector } from '../google-connector';

@Injectable()
export class GoogleRestTranslatorService extends GoogleConnector {
  protected createTranslatorService() {}
  protected async translateData(textToTranslate: string[], language: string) {
    const text = textToTranslate.join(' ');
    const key = process.env.KEY;
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: { key: key, q: text, target: language },
      },
    );

    console.log(response);
    const data = response.data;
    console.log(data.data.translations);
    return data;
  }
}
