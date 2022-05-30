import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';
import { FileHandlerModule } from './file-handler/file-handler.module';
import { GoogleModule } from './translator-api/google.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TranslatorModule,
    FileHandlerModule,
    GoogleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
