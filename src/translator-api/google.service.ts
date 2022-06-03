import { Injectable } from '@nestjs/common';
import { GoogleConnector } from './google-conntector/google-connector';

@Injectable()
export class GoogleService {
  translate(
    googleTranslationsClass: GoogleConnector,
    textToTranslate: string[],
    languageToTranslateTo: string,
  ) {
    return googleTranslationsClass.translate(
      textToTranslate,
      languageToTranslateTo,
    );
  }
}
