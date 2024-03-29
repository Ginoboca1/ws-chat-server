import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
  private clientId: string;
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connect', (socket: Socket) => {
      socket.on('auth', (token) => {
        try {
          const { name, id } = this.chatService.decodedToken(token);
          this.clientId = id;
          this.chatService.onClientConnected({ name, id });
          this.server.emit('on-clients-changed', this.chatService.getClients());
        } catch (error) {
          console.error(error);
        }
      });

      socket.on('disconnect', () => {
        this.chatService.onClientDisconnected(this.clientId);
        this.server.emit('on-clients-changed', this.chatService.getClients());
      });

      socket.on('connect', () => {
        this.server.emit('on-clients-changed', this.chatService.getClients());
      });
    });
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: string, @MessageBody() token: string) {
    const { name, id } = this.chatService.decodedToken(token[1]);
    if (!message) {
      return;
    }
    this.server.emit('on-message', { userId: id, userName: name, message });
  }
}
