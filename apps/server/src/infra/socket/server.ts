import { Server } from "socket.io";

let io: Server | undefined;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
}

export function notifyClients(event: string, data: any) {
  if (!io) {
    throw new Error("Socket.IO not initialized. Call initializeSocket first.");
  }
  io.emit(event, data);
}
