import { Module } from '@nestjs/common';
import { GoogleLibraryTranslatorService } from './google-conntector/google-library-translator/google-library-translator.service';
import { GoogleService } from './google.service';

@Module({
  providers: [GoogleService, GoogleLibraryTranslatorService],
  exports: [GoogleLibraryTranslatorService, GoogleService],
})
export class GoogleModule {}
