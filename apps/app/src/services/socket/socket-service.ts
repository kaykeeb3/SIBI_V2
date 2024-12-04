import { io, Socket } from "socket.io-client";

export interface Notification {
  id: string;
  name: string;
  quantity: number;
  startDate: string;
  type: "schedule" | "loan";
  status?: string;
  isDelayed?: boolean;
  message: string;
}

class SocketService {
  socket: Socket | null = null;
  isConnected: boolean = false;

  // Método de conexão
  connect() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "Usuário não logado. Conexão ao socket não será estabelecida."
      );
      this.isConnected = false;
      return;
    }

    this.socket = io("http://localhost:3000", {
      auth: { token },
    });

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor");
      this.isConnected = true;
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado do servidor");
      this.isConnected = false;
    });

    this.socket.on("connect_error", () => {
      console.error("Erro ao conectar ao servidor");
      this.isConnected = false;
    });

    this.socket.on("connect_timeout", () => {
      console.error("Tempo de conexão esgotado");
      this.isConnected = false;
    });
  }

  // Verifica o status de conexão do socket
  getConnectionStatus() {
    return this.isConnected ? "Operacional" : "Erro";
  }

  // Recebe notificações de agendamentos e empréstimos vencidos
  onOverdueNotifications(callback: (notifications: Notification[]) => void) {
    if (!this.socket) return;

    this.socket.on(
      "overdueScheduleNotification",
      (notifications: Notification[]) => {
        const formattedNotifications = notifications.map((notification) => ({
          ...notification,
          type: "schedule" as const,
        }));
        callback(formattedNotifications);
      }
    );

    this.socket.on(
      "overdueLoanNotification",
      (notifications: Notification[]) => {
        const formattedNotifications = notifications.map((notification) => ({
          ...notification,
          type: "loan" as const,
        }));
        callback(formattedNotifications);
      }
    );
  }

  // Desconectar o socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log("Socket desconectado");
    }
  }
}

const socketService = new SocketService();
export default socketService;
