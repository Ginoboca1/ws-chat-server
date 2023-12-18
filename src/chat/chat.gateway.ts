import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connect', (socket: Socket) => {
      console.log(socket.handshake.auth.name);
    });
  }
}
