import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { FileHandlerModule } from '../file-handler/file-handler.module';
import { GoogleModule } from 'src/google/google.module';

@Module({
  imports: [FileHandlerModule, GoogleModule],
  providers: [TranslatorService],
  controllers: [TranslatorController],
})
export class TranslatorModule {}
