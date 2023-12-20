import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client } from 'src/common/interfaces/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ChatService {
  constructor(public jwt: JwtService) {}
  private clients: Record<string, Client> = {};

  onClientConnected(client: Client) {
    this.clients[client.id] = client;
  }

  onClientDisconnected(id: string) {
    delete this.clients[id];
    console.log('cliente eliminado');
  }

  getClients() {
    return Object.values(this.clients);
  }

  decodedToken(token: string) {
    const decodedToken = this.jwt.decode(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Token not provided');
    }
    return decodedToken;
  }
}
