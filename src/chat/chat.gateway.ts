import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  afterInit(server: any) {
    console.log('esto se ejecuta cuando inicia el servicio');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Esto se ejecuta cuando alguien se conecta al socket');
  }
  handleDisconnect(client: any) {
    console.log('se ejecuta cuando alguien se desconecta');
  }
}
