import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { GoogleConntectorService } from './google-conntector/google-conntector.service';

@Module({
  providers: [TranslatorService, GoogleConntectorService],
  controllers: [TranslatorController]
})
export class TranslatorModule {}
