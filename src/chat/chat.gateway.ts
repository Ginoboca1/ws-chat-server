import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;
  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(socket);
      console.log('connected');
    });
  }
}
