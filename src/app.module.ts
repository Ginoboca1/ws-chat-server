import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UsersModule,
    PostsModule,
    AdminsModule,
    ChatModule,
  ],
  controllers: [],
  providers: [Reflector],
})
export class AppModule {}
