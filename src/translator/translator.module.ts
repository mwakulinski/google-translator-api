import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { GoogleConntectorService } from './google-conntector/google-conntector.service';
import { FileHandlerModule } from '../file-handler/file-handler.module';

@Module({
  imports: [FileHandlerModule],
  providers: [TranslatorService, GoogleConntectorService],
  controllers: [TranslatorController],
})
export class TranslatorModule {}
