import { Module } from '@nestjs/common';
import { GoogleLibraryService } from './google-conntector/google-library/google-library.service';
import { GoogleService } from './google.service';

@Module({
  providers: [GoogleService, GoogleLibraryService],
  exports: [GoogleLibraryService, GoogleService],
})
export class GoogleModule {}
