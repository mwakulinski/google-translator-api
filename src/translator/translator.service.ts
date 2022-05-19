import { Injectable } from '@nestjs/common';
import { TranslateLanguage } from './TranslateLanguage';

@Injectable()
export class TranslatorService {
  translate(body: TranslateLanguage) {
    throw new Error('Method not implemented.');
  }
}
