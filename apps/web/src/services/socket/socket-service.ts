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
    this.socket = io("http://localhost:3000");

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
        // Define o tipo "schedule" de forma explícita para cada notificação
        const formattedNotifications = notifications.map((notification) => ({
          ...notification,
          type: "schedule" as const, // <-- Aqui usamos `as const` para restringir o tipo
        }));
        callback(formattedNotifications);
      }
    );

    this.socket.on(
      "overdueLoanNotification",
      (notifications: Notification[]) => {
        // Define o tipo "loan" de forma explícita para cada notificação
        const formattedNotifications = notifications.map((notification) => ({
          ...notification,
          type: "loan" as const, // <-- Aqui usamos `as const` para restringir o tipo
        }));
        callback(formattedNotifications);
      }
    );
  }

  // Recebe notificações de agendamento devolvido
  onScheduleReturned(callback: (scheduleId: string) => void) {
    if (!this.socket) return;

    this.socket.on("scheduleReturned", callback);
  }

  // Recebe notificações de empréstimo devolvido
  onLoanReturned(callback: (loanId: string) => void) {
    if (!this.socket) return;

    this.socket.on("loanReturned", callback);
  }

  // Desconectar o socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Instância do serviço
const socketService = new SocketService();
export default socketService;
