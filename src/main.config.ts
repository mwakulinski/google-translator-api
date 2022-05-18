import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setMainConfig = (app: INestApplication) => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
};
