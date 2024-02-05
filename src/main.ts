import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://ws-client-6ox0.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => {
    console.log(`Server listen in port ${process.env.PORT}`);
  });
}
bootstrap();
