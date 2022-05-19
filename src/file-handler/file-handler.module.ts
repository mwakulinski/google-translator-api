import { Module } from '@nestjs/common';
import { FileHandlerService } from './file-handler.service';

@Module({
  providers: [FileHandlerService]
})
export class FileHandlerModule {}
