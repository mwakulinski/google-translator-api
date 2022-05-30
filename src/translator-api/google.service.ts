import { Injectable } from '@nestjs/common';
import { GoogleConnector } from './google-conntector/google-connector';

@Injectable()
export class GoogleService {
  translate(
    googleTranslationsClass: GoogleConnector,
    textToTranslate: string[],
    language: string,
  ) {
    return googleTranslationsClass.translate(textToTranslate, language);
  }
}
