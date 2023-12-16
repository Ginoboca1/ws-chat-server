import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as http from 'http';
// import { Server } from 'socket.io';
// import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const corsOptions = {
  //   origin: 'http://localhost:5173', // Reemplaza con el origen correcto de tu aplicación front-end
  //   credentials: true,
  // };
  // app.enableCors(corsOptions);
  // const server = http.createServer(app.getHttpAdapter().getInstance());
  // const io = new Server(server, {
  //   cors: {
  //     origin: 'http://localhost:5173',
  //     methods: ['GET', 'POST'],
  //     credentials: true,
  //   },
  // });

  // app.useWebSocketAdapter(new IoAdapter(io));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    console.log(`Server listen in port ${process.env.PORT}`);
  });
}
bootstrap();
