import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { GoogleConnectorService } from './google-conntector/google-conntector.service';
import { FileHandlerModule } from '../file-handler/file-handler.module';

@Module({
  imports: [FileHandlerModule],
  providers: [TranslatorService, GoogleConnectorService],
  controllers: [TranslatorController],
})
export class TranslatorModule {}
