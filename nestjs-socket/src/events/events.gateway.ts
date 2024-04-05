import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  }

  @SubscribeMessage('message') // on ('message')
  handleMessage(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log('Message from client: ' + data.msg);

    // emit ('message')
    return of({
      event: 'message',
      data: 'MESSAGE RETURNED FROM SERVER: Hello',
    });
  }
}
