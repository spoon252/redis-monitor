import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

export class SocketService {

  socket: any;

  constructor() { }

  emitMessage(event:string, message:string){
    this.socket.emit(event, message);
  }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}