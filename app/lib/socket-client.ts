import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let socket: Socket | null = null;

export function connectSocket(token?: string) {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: token ? { token } : undefined,
      transports: ['websocket'],
      withCredentials: true,
    });

    socket.on('connect', () => {
      // Connection established
      // You can emit user info here if needed
      // Example: socket.emit("storeUser", userName);
    });

    socket.on('disconnect', reason => {
      // Handle disconnect
      // Optionally try to reconnect or notify user
    });

    // Add more event listeners as needed
    // Example: socket.on("chatMessage", ...)
  }
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
