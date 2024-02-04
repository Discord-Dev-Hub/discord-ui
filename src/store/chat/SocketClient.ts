import { Socket, io } from 'socket.io-client';

interface ClientToServerEvents {}

interface ServerToClientEvents {
  test: (data: any) => void;
}

export class SocketClient {
  private static socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  static init(wsUrl: string, accessToken: string) {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(wsUrl, {
      path: '/socketio',
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionAttempts: 10,
      transports: ['websocket'],
      auth: { token: accessToken },
    });

    SocketClient.socket = socket;

    socket.on('test', async (data: any) => {
      console.log(data);
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.connect();
  }

  static disconnect() {
    SocketClient.socket?.disconnect();
  }
}
