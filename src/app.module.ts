import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ChatModule } from './chat/chat.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PostsModule } from './modules/posts/posts.module';

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
