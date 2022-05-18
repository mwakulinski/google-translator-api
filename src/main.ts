import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setMainConfig } from './main.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setMainConfig(app);
  await app.listen(3000);
}
bootstrap();
