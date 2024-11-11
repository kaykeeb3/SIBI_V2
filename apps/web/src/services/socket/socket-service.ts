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

  // Método de conexão
  connect() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn(
        "Usuário não logado. Conexão ao socket não será estabelecida."
      );
      return;
    }

    this.socket = io("http://localhost:3000", {
      auth: { token },
    });

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor");
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado do servidor");
    });
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

  onScheduleReturned(callback: (scheduleId: string) => void) {
    if (!this.socket) return;
    this.socket.on("scheduleReturned", callback);
  }

  onLoanReturned(callback: (loanId: string) => void) {
    if (!this.socket) return;
    this.socket.on("loanReturned", callback);
  }

  // Desconectar o socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log("Socket desconectado");
    }
  }
}

const socketService = new SocketService();
export default socketService;
