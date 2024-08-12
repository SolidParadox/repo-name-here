import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips properties that do not have decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
    transform: false, // Automatically transforms payloads to DTO instances
  }));
  
  app.use(
    session({
      secret: 'shibboleth-secre-here',
      resave: false,
      saveUninitialized: false,
    }),
  );
  
  await app.listen(3005);
}
bootstrap();
