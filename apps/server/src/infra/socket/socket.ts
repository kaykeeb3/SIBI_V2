import { Server as SocketIO, Server } from "socket.io";
import { Server as HttpServer } from "http";
import {
  checkOverdueSchedules,
  checkOverdueLoans,
} from "@/application/use-cases/notificationUseCase";

// Corrigimos o nome da interface para evitar conflito com o tipo importado `Server`
interface SocketServerInstance {
  io: Server;
  cleanup: () => void;
}

export function Socket(server: HttpServer): SocketServerInstance {
  const io: Server = new SocketIO(server, {
    cors: {
      origin: "*",
      methods: "*",
    },
  });

  let notificationInterval: NodeJS.Timeout | null = null;

  const notifyOverdueSchedules = async () => {
    try {
      const overdueSchedules = await checkOverdueSchedules();
      if (overdueSchedules.length > 0) {
        io.emit("overdueScheduleNotification", overdueSchedules);
        console.log("Overdue schedules notification sent.");
      } else {
        console.log("No overdue schedules to notify.");
      }
    } catch (error) {
      console.error("Error fetching overdue schedules:", error);
    }
  };

  const notifyOverdueLoans = async () => {
    try {
      const overdueLoans = await checkOverdueLoans();
      if (overdueLoans.length > 0) {
        io.emit("overdueLoanNotification", overdueLoans);
        console.log("Overdue loans notification sent.");
      } else {
        console.log("No overdue loans to notify.");
      }
    } catch (error) {
      console.error("Error fetching overdue loans:", error);
    }
  };

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Notifica os agendamentos e empréstimos atrasados quando o cliente se conecta
    notifyOverdueSchedules();
    notifyOverdueLoans();

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Inicia o intervalo de notificações a cada 60 segundos
  notificationInterval = setInterval(async () => {
    try {
      await Promise.all([notifyOverdueSchedules(), notifyOverdueLoans()]);
    } catch (error) {
      console.error("Error during notifications:", error);
    }
  }, 60000); // Intervalo de 1 minuto (60000 ms)

  // Retornar o objeto io e a função de limpeza
  return {
    io,
    cleanup: () => {
      if (notificationInterval) {
        clearInterval(notificationInterval);
        notificationInterval = null;
        console.log("Notification interval cleared.");
      }
      io.close(); // Fecha o servidor Socket.IO
      console.log("Socket.IO server closed.");
    },
  };
}
